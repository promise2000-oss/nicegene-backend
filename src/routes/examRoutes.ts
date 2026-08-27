import { Router } from "express";
import { getExams, getExamById, submitExam, createExam } from "../controllers/examController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Exam management and submission
 */

/**
 * @swagger
 * /exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams (without correct answers)
 */
router.get("/", protect, getExams);

/**
 * @swagger
 * /exams:
 *   post:
 *     summary: Create a new exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - course
 *               - questions
 *               - duration
 *               - totalPoints
 *               - passingScore
 *             properties:
 *               title:
 *                 type: string
 *               course:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: number
 *                     points:
 *                       type: number
 *               duration:
 *                 type: number
 *               totalPoints:
 *                 type: number
 *               passingScore:
 *                 type: number
 *     responses:
 *       201:
 *         description: Exam created
 */
router.post("/", protect, createExam);

/**
 * @swagger
 * /exams/{id}:
 *   get:
 *     summary: Get exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam details (without correct answers)
 *       404:
 *         description: Exam not found
 */
router.get("/:id", protect, getExamById);

/**
 * @swagger
 * /exams/{id}/submit:
 *   post:
 *     summary: Submit exam answers for grading
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionIndex:
 *                       type: number
 *                     selectedAnswer:
 *                       type: number
 *     responses:
 *       201:
 *         description: Exam graded and results returned
 *       400:
 *         description: Invalid answers
 *       404:
 *         description: Exam not found
 */
router.post("/:id/submit", protect, submitExam);

export default router;
