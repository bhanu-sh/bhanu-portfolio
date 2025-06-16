import type { InferSchemaType } from "mongoose";
import { ProjectSchema } from "@/lib/models/Project";
import { SkillSchema } from "@/lib/models/Skill";

export type Project = InferSchemaType<typeof ProjectSchema> & { _id?: string };
export type Skill = InferSchemaType<typeof SkillSchema> & { _id?: string };