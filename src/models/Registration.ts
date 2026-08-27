import { Schema, model } from "mongoose";
import { IRegistration } from "./types";

const registrationSchema = new Schema<IRegistration>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    cohort: { type: String, required: true, trim: true },
    paymentRef: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export const Registration = model<IRegistration>("Registration", registrationSchema);
