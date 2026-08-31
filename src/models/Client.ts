import { Schema, model } from "mongoose";
import { IClient } from "./types";

const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    industry: { type: String, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Client = model<IClient>("Client", clientSchema);
