import { Router } from "express";
import {
  getCertificateById,
  getCertificatesByStudent,
  createCertificate,
  deleteCertificate,
} from "../controllers/certificateController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Certificate verification and issuance
 */

/**
 * @swagger
 * /certificates:
 *   get:
 *     summary: Get certificates by student email or name
 *     tags: [Certificates]
 *     parameters:
 *       - in: query
 *         name: student
 *         required: true
 *         schema:
 *           type: string
 *         description: Student email or name to search
 *     responses:
 *       200:
 *         description: List of matching certificates
 *       400:
 *         description: Missing student query parameter
 */
router.get("/", getCertificatesByStudent);

/**
 * @swagger
 * /certificates:
 *   post:
 *     summary: Issue a new certificate
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentName
 *               - studentEmail
 *               - course
 *             properties:
 *               studentName:
 *                 type: string
 *               studentEmail:
 *                 type: string
 *               course:
 *                 type: string
 *               grade:
 *                 type: string
 *               issuedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Certificate issued
 *       400:
 *         description: Missing required fields
 */
router.post("/", protect, createCertificate);

/**
 * @swagger
 * /certificates/{id}:
 *   get:
 *     summary: Verify a certificate by its ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Certificate ID (e.g., NG-ABC123-XYZ)
 *     responses:
 *       200:
 *         description: Certificate details
 *       404:
 *         description: Certificate not found
 */
router.get("/:id", getCertificateById);

/**
 * @swagger
 * /certificates/{id}:
 *   delete:
 *     summary: Delete a certificate
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Certificate ID (e.g., NG-ABC123-XYZ)
 *     responses:
 *       200:
 *         description: Certificate deleted
 *       404:
 *         description: Certificate not found
 */
router.delete("/:id", protect, deleteCertificate);

export default router;
