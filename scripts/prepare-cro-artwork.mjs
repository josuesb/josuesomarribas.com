import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Export generated artwork without changing its content. Stable canvas geometry
// keeps the existing independent CSS depth/float animations intact.
const input = JSON.parse(await fs.readFile(process.argv[2], "utf8"));
const dimensions = { browser:[1520,840], mobile:[480,860], attention:[680,480], code:[620,440], ticket:[700,224], live:[540,152], winner:[540,220] };
const directory = path.join(process.cwd(), "public/assets/cro-experience");
await fs.mkdir(directory, { recursive:true });
for (const [name, [width,height]] of Object.entries(dimensions)) {
  if (!input[name]) throw new Error(`Missing generated layer: ${name}`);
  const source = sharp(input[name]);
  if (!(await source.metadata()).hasAlpha) throw new Error(`${name} must have alpha transparency`);
  const output = path.join(directory, `${name}-refined.webp`);
  await source.resize(width,height,{ fit:"contain", background:{ r:0,g:0,b:0,alpha:0 } }).webp({ quality:88, alphaQuality:100, effort:6 }).toFile(output);
  console.log(`${name}: ${width}×${height}, ${Math.round((await fs.stat(output)).size/1024)} KB`);
}
