import { Schema, model } from "mongoose";
import { ICoursePricing } from "./types";

const coursePricingSchema = new Schema<ICoursePricing>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    desc: { type: String, trim: true },
    track: { type: String, trim: true },
    fee: { type: String, trim: true },
    time: { type: String, trim: true },
    status: { type: String, trim: true },
    courseDesc: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Course = model<ICoursePricing>("Course", coursePricingSchema);
