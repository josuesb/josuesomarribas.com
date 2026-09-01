import type {SchemaTypeDefinition} from "sanity";
import {articleType} from "./articleType";
import {topicType} from "./topicType";

export const schemaTypes: SchemaTypeDefinition[] = [articleType, topicType];
