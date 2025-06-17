import type { InferSchemaType } from "mongoose";
import { ProjectSchema } from "@/lib/models/Project";
import { SkillSchema } from "@/lib/models/Skill";
import { MessageSchema } from "@/lib/models/Message";

export type Project = InferSchemaType<typeof ProjectSchema> & { _id: string };
export type Skill = InferSchemaType<typeof SkillSchema> & { _id: string };
export type Message = InferSchemaType<typeof MessageSchema> & { _id: string };