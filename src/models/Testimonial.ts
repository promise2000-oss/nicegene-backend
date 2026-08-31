import { Schema, model } from "mongoose";
import { ITestimonial } from "./types";

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    content: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    section: { type: String, enum: ["homepage", "general"], default: "general" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Testimonial = model<ITestimonial>("Testimonial", testimonialSchema);
