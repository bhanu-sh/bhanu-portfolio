import { Schema, models, model } from "mongoose";

export const SkillSchema = new Schema({
  name: { type: String, required: true },
});

export const Skill = models.Skill || model("Skill", SkillSchema);
