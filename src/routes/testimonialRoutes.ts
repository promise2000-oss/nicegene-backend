import { Router } from "express";
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: Testimonials management
 */

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Retrieve approved testimonials
 *     tags: [Testimonials]
 *     parameters:
 *       - in: query
 *         name: section
 *         schema:
 *           type: string
 *           enum: [homepage, general]
 *       - in: query
 *         name: featured
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of testimonials
 */
router.get("/", getTestimonials);

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Submit a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *               section:
 *                 type: string
 *                 enum: [homepage, general]
 *     responses:
 *       201:
 *         description: Testimonial submitted
 */
router.post("/", createTestimonial);

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial details
 */
router.get("/:id", getTestimonialById);

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Update a testimonial (admin)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *               isFeatured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Testimonial updated
 */
router.put("/:id", protect, updateTestimonial);

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial (admin)
 *     tags: [Testimonials]
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
 *         description: Testimonial deleted
 */
router.delete("/:id", protect, deleteTestimonial);

export default router;
