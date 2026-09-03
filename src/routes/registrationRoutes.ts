import { Router } from "express";
import {
  createRegistration,
  getRegistrationById,
  getAllRegistrations,
  deleteRegistration,
} from "../controllers/registrationController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Cohort registration management
 */

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Submit a new registration
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - course
 *               - cohort
 *               - amount
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               course:
 *                 type: string
 *               cohort:
 *                 type: string
 *               paymentRef:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Registration created
 *       400:
 *         description: Missing required fields
 */
router.post("/", createRegistration);

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Get all registrations
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all registrations
 */
router.get("/", protect, getAllRegistrations);

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Get registration by ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration details
 *       404:
 *         description: Registration not found
 */
router.get("/:id", getRegistrationById);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registration
 *     tags: [Registrations]
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
 *         description: Registration deleted
 *       404:
 *         description: Registration not found
 */
router.delete("/:id", protect, deleteRegistration);

export default router;
