import { Schema, model } from "mongoose";
import { IPartner } from "./types";

const partnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Partner = model<IPartner>("Partner", partnerSchema);
