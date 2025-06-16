import { Schema, models, model } from "mongoose";

export const ProjectSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String},
  link: { type: String, required: true },
});

export const Project = models.Project || model("Project", ProjectSchema);
