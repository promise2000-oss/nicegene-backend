import { Schema, model } from "mongoose";
import { IExam } from "./types";

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    points: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const examSchema = new Schema<IExam>(
  {
    title: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    questions: { type: [questionSchema], required: true },
    duration: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    passingScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Exam = model<IExam>("Exam", examSchema);
