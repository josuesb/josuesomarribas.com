import {codeInput} from "@sanity/code-input";
import {visionTool} from "@sanity/vision";
import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {schemaTypes} from "./sanity/schemaTypes";

export default defineConfig({
  name: "portfolio",
  title: "Josue Somarribas — Portfolio",
  projectId: "uui9v8rf",
  dataset: "production",
  plugins: [structureTool(), codeInput(), visionTool()],
  schema: {types: schemaTypes},
});
