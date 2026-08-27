import { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "superadmin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: string;
  client?: string;
  year?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IBlog extends Document {
  title: string;
  content: string;
  image: string;
  author: string;
  tags?: string[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface IStaff extends Document {
  name: string;
  email: string;
  dateOfBirth: Date; // MM-DD or full Date
  role: string;
  department: string;
  category: "executive" | "staff"; // determines display section on website
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IGraduate extends Document {
  name: string;
  course: string;
  graduationYear: number;
  grade?: string;
  image: string;
  testimonial?: string;
  linkedInUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IEvent extends Document {
  title: string;
  type: "birthday" | "activity" | "company-event";
  date: string; // display date e.g. "Jun 15, 2026"
  description: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICoursePricing extends Document {
  title: string;
  desc?: string;
  track?: string;
  fee?: string;
  time?: string;
  status?: string;
  courseDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IStudent extends Document {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  enrollmentDate: Date;
  status: "active" | "completed" | "dropped";
  paymentStatus: "pending" | "paid" | "partial";
  grades?: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRegistration extends Document {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  cohort: string;
  paymentRef?: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayment extends Document {
  reference: string;
  amount: number;
  email: string;
  status: "pending" | "verified" | "failed";
  gateway: "paystack" | "flutterwave" | "manual";
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
export interface IReferral extends Document {
  referrerName: string;
  referrerEmail: string;
  referredName: string;
  referredEmail: string;
  referredPhone?: string;
  course?: string;
  status: "pending" | "contacted" | "enrolled" | "commission-paid";
  referralCode: string;
  commission?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IExam extends Document {
  title: string;
  course: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    points: number;
  }[];
  duration: number;
  totalPoints: number;
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IExamSubmission extends Document {
  examId: string;
  studentId: string;
  answers: {
    questionIndex: number;
    selectedAnswer: number;
  }[];
  score: number;
  submittedAt: Date;
  graded: boolean;
  passed: boolean;
}
export interface ICertificate extends Document {
  certificateId: string;
  studentName: string;
  studentEmail: string;
  course: string;
  completionDate: Date;
  grade?: string;
  issuedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
