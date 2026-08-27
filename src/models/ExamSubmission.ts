import { Schema, model } from "mongoose";
import { IExamSubmission } from "./types";

const answerSchema = new Schema(
  {
    questionIndex: { type: Number, required: true },
    selectedAnswer: { type: Number, required: true },
  },
  { _id: false }
);

const examSubmissionSchema = new Schema<IExamSubmission>(
  {
    examId: { type: String, required: true },
    studentId: { type: String, required: true },
    answers: { type: [answerSchema], required: true },
    score: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
    graded: { type: Boolean, default: false },
    passed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ExamSubmission = model<IExamSubmission>(
  "ExamSubmission",
  examSubmissionSchema
);
