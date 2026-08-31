import { Schema, model } from "mongoose";
import { IGadget } from "./types";

const gadgetSchema = new Schema<IGadget>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, trim: true },
    inStock: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Gadget = model<IGadget>("Gadget", gadgetSchema);
