import { Schema, model } from "mongoose";
import { IReferral } from "./types";

const referralSchema = new Schema<IReferral>(
  {
    referrerName: { type: String, required: true, trim: true },
    referrerEmail: { type: String, required: true, trim: true, lowercase: true },
    referredName: { type: String, required: true, trim: true },
    referredEmail: { type: String, required: true, trim: true, lowercase: true },
    referredPhone: { type: String },
    course: { type: String },
    status: {
      type: String,
      enum: ["pending", "contacted", "enrolled", "commission-paid"],
      default: "pending",
    },
    referralCode: { type: String, required: true, unique: true, trim: true },
    commission: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Referral = model<IReferral>("Referral", referralSchema);
