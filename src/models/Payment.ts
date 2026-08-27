import { Schema, model } from "mongoose";
import { IPayment } from "./types";

const paymentSchema = new Schema<IPayment>(
  {
    reference: { type: String, required: true, unique: true, trim: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    status: { type: String, enum: ["pending", "verified", "failed"], default: "pending" },
    gateway: { type: String, enum: ["paystack", "flutterwave", "manual"], default: "manual" },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
