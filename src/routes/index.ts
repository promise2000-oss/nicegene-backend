import { Router } from "express";
import authRoutes from "./authRoutes";
import projectRoutes from "./projectRoutes";
import blogRoutes from "./blogRoutes";
import staffRoutes from "./staffRoutes";
import graduateRoutes from "./graduateRoutes";
import eventRoutes from "./eventRoutes";
import contactRoutes from "./contactRoutes";
import courseRoutes from "./courseRoutes";
import studentRoutes from "./studentRoutes";
import registrationRoutes from "./registrationRoutes";
import paymentRoutes from "./paymentRoutes";
import referralRoutes from "./referralRoutes";
import examRoutes from "./examRoutes";
import certificateRoutes from "./certificateRoutes";
import testimonialRoutes from "./testimonialRoutes";
import partnerRoutes from "./partnerRoutes";
import clientRoutes from "./clientRoutes";
import gadgetRoutes from "./gadgetRoutes";
import announcementRoutes from "./announcementRoutes";
import jobRoutes from "./jobRoutes";

const router = Router();

// Existing routes
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/staff", staffRoutes);
router.use("/graduates", graduateRoutes);
router.use("/events", eventRoutes);
router.use("/contact", contactRoutes);
router.use("/courses", courseRoutes);

// Phase 1: Critical routes
router.use("/students", studentRoutes);
router.use("/registrations", registrationRoutes);
router.use("/payments", paymentRoutes);
router.use("/referrals", referralRoutes);
router.use("/exams", examRoutes);
router.use("/certificates", certificateRoutes);

// Phase 2: High priority routes
router.use("/testimonials", testimonialRoutes);
router.use("/partners", partnerRoutes);
router.use("/clients", clientRoutes);
router.use("/gadgets", gadgetRoutes);
router.use("/announcements", announcementRoutes);
router.use("/jobs", jobRoutes);

export default router;
