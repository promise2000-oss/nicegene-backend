import { Router } from "express";
import {
  getCoursePricing,
  upsertCoursePricing,
  deleteCourse,
} from "../controllers/courseController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Course Pricing
 *   description: Admin overrides for academy course pricing (desc, track, fee, time, status, courseDesc)
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all course pricing overrides
 *     tags: [Course Pricing]
 *     responses:
 *       200:
 *         description: List of pricing overrides
 */
router.get("/", getCoursePricing);

/**
 * @swagger
 * /courses/{title}:
 *   put:
 *     summary: Upsert pricing override for a course (matched by title)
 *     tags: [Course Pricing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Exact course title (URL-encoded if needed)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *               track:
 *                 type: string
 *               fee:
 *                 type: string
 *               time:
 *                 type: string
 *               status:
 *                 type: string
 *               courseDesc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pricing override saved
 */
router.put("/:title", protect, upsertCoursePricing);

/**
 * @swagger
 * /courses/{title}:
 *   delete:
 *     summary: Delete a course pricing override
 *     tags: [Course Pricing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Exact course title (URL-encoded if needed)
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */
router.delete("/:title", protect, deleteCourse);

export default router;
