import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const audioRoot = path.join(root, "public", "audio", "blog");
const backupRoot = path.join(root, "backup", "audio-originals");
const targetBitrate = 64_000;

function run(command, args) {
  const result = spawnSync(command, args, { cwd:root, encoding:"utf8", maxBuffer:10 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.stderr || `${command} failed`);
  return result.stdout.trim();
}

function probe(file) {
  return JSON.parse(run("ffprobe", ["-v","error","-select_streams","a:0","-show_entries","stream=channels,sample_rate,bit_rate:format=duration","-of","json",file]));
}

function findMp3(directory) {
  return fs.readdirSync(directory, { withFileTypes:true }).flatMap(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? findMp3(target) : entry.name.endsWith(".mp3") ? [target] : [];
  }).sort();
}

if (!fs.existsSync(audioRoot)) throw new Error(`Missing audio directory: ${audioRoot}`);
fs.mkdirSync(backupRoot, { recursive:true });

const files = findMp3(audioRoot);
let optimized = 0;
let skipped = 0;
let originalBytes = 0;
let optimizedBytes = 0;

for (const [index,file] of files.entries()) {
  const relative = path.relative(audioRoot, file);
  const backup = path.join(backupRoot, relative);
  fs.mkdirSync(path.dirname(backup), { recursive:true });
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);

  const before = probe(file);
  const originalDuration = Number(probe(backup).format.duration);
  const stream = before.streams[0];
  originalBytes += fs.statSync(backup).size;
  if (Number(stream.bit_rate) <= targetBitrate + 2_000 && Number(stream.channels) === 1 && Number(stream.sample_rate) === 24_000) {
    optimizedBytes += fs.statSync(file).size;
    skipped += 1;
    console.log(`[${index + 1}/${files.length}] SKIP ${relative}`);
    continue;
  }

  const temporary = `${file}.optimize.tmp.mp3`;
  run("ffmpeg", ["-y","-loglevel","error","-i",backup,"-vn","-map_metadata","-1","-ac","1","-ar","24000","-codec:a","libmp3lame","-b:a","64k",temporary]);
  const after = probe(temporary);
  const optimizedDuration = Number(after.format.duration);
  if (Math.abs(originalDuration - optimizedDuration) > 0.25) {
    fs.rmSync(temporary, { force:true });
    throw new Error(`Duration mismatch for ${relative}: ${originalDuration}s -> ${optimizedDuration}s`);
  }
  fs.renameSync(temporary, file);
  optimizedBytes += fs.statSync(file).size;
  optimized += 1;
  console.log(`[${index + 1}/${files.length}] DONE ${relative}`);
}

const saved = originalBytes - optimizedBytes;
console.log(`Finished: ${optimized} optimized, ${skipped} already optimized.`);
console.log(`Library: ${(originalBytes / 1024 / 1024).toFixed(1)} MB -> ${(optimizedBytes / 1024 / 1024).toFixed(1)} MB (${(saved / 1024 / 1024).toFixed(1)} MB saved).`);
