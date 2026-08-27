import { Router } from "express";
import {
  submitContactForm,
  getContactSubmissions,
  markAsRead,
} from "../controllers/contactController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form inquiries management
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit a new inquiry using the contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inquiry submitted successfully
 *       400:
 *         description: Missing required fields
 *   get:
 *     summary: Get all contact form submissions (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inquiries
 *       401:
 *         description: Unauthorized
 */
router.post("/", submitContactForm); // Public submission
router.get('/', protect, getContactSubmissions); // Admin only view

/**
 * @swagger
 * /contact/{id}/read:
 *   patch:
 *     summary: Mark a contact form submission as read (Admin only)
 *     tags: [Contact]
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
 *         description: Submission marked as read
 *       404:
 *         description: Submission not found
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id/read', protect, markAsRead); // Admin only mark as read

export default router;
