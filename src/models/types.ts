import { Document } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "superadmin" | "student";
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
export interface IEventRsvp {
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  guestCount?: number;
  submittedAt: Date;
}
export interface IEvent extends Document {
  title: string;
  type: "birthday" | "activity" | "company-event";
  date: string;
  description: string;
  images?: string[];
  rsvps?: IEventRsvp[];
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
export interface ITestimonial extends Document {
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
  section: "homepage" | "general";
  status: "pending" | "approved" | "rejected";
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPartner extends Document {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  category?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IClient extends Document {
  name: string;
  logo?: string;
  website?: string;
  industry?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IGadget extends Document {
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  inStock: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAnnouncement extends Document {
  title: string;
  message: string;
  isActive: boolean;
  priority: "low" | "medium" | "high";
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IJob extends Document {
  title: string;
  department?: string;
  location?: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  description: string;
  requirements?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
