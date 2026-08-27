import { Schema, model } from "mongoose";
import { IEvent } from "./types";

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
  },
  { timestamps: true }
);

export const Event = model<IEvent>("Event", eventSchema);
