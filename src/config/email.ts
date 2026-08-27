import nodemailer from "nodemailer";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

// Nodemailer SMTP configuration (for development)
export const nodemailerTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525', 10),
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Resend client configuration (for production)
export const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const emailFrom = process.env.EMAIL_FROM || 'Nicegene <onboarding@resend.dev>';
export const useResend = isProduction && !!resendClient;
