import { Schema, model } from "mongoose";
import { IEvent } from "./types";

const rsvpSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  attending: { type: Boolean, required: true, default: true },
  guestCount: { type: Number, default: 1 },
  submittedAt: { type: Date, default: Date.now },
}, { _id: false });

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["birthday", "activity", "company-event"],
    },
    date: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: [{ type: String }],
    rsvps: [rsvpSchema],
  },
  { timestamps: true }
);

export const Event = model<IEvent>("Event", eventSchema);
