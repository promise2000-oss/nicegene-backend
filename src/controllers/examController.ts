import { Response } from "express";
import { Exam } from "../models/Exam";
import { ExamSubmission } from "../models/ExamSubmission";
import { AuthRequest } from "../middleware/authMiddleware";

export const getExams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const exams = await Exam.find().select("-questions.correctAnswer").sort({ createdAt: -1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching exams",
      error: (error as Error).message,
    });
  }
};

export const getExamById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const exam = await Exam.findById(req.params.id).select("-questions.correctAnswer");
    if (!exam) {
      res.status(404).json({ message: "Exam not found" });
      return;
    }
    res.json(exam);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching exam",
      error: (error as Error).message,
    });
  }
};

export const submitExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { answers } = req.body;
    const examId = String(req.params.id);
    const studentId = req.user?.id || "anonymous";

    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({ message: "Answers array is required" });
      return;
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      res.status(404).json({ message: "Exam not found" });
      return;
    }

    // Grade the submission
    let score = 0;
    answers.forEach((answer: { questionIndex: number; selectedAnswer: number }) => {
      const question = exam.questions[answer.questionIndex];
      if (question && answer.selectedAnswer === question.correctAnswer) {
        score += question.points;
      }
    });

    const passed = score >= exam.passingScore;

    const submission = await ExamSubmission.create({
      examId,
      studentId,
      answers: answers as { questionIndex: number; selectedAnswer: number }[],
      score,
      graded: true,
      passed,
    });

    res.status(201).json({
      message: "Exam submitted and graded",
      submission,
      totalPoints: exam.totalPoints,
      passingScore: exam.passingScore,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting exam",
      error: (error as Error).message,
    });
  }
};

export const createExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, course, questions, duration, totalPoints, passingScore } = req.body;

    if (!title || !course || !questions || !duration || !totalPoints || !passingScore) {
      res.status(400).json({ message: "All required fields must be provided" });
      return;
    }

    const exam = await Exam.create({
      title,
      course,
      questions,
      duration,
      totalPoints,
      passingScore,
    });

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({
      message: "Error creating exam",
      error: (error as Error).message,
    });
  }
};
