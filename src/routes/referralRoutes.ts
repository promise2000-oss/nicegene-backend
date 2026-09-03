import { Router } from "express";
import {
  createReferral,
  getReferrals,
  getReferralById,
  updateReferralStatus,
  deleteReferral,
} from "../controllers/referralController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Referrals
 *   description: Referral tracking and management
 */

/**
 * @swagger
 * /referrals:
 *   post:
 *     summary: Submit a new referral
 *     tags: [Referrals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - referrerName
 *               - referrerEmail
 *               - referredName
 *               - referredEmail
 *             properties:
 *               referrerName:
 *                 type: string
 *               referrerEmail:
 *                 type: string
 *               referredName:
 *                 type: string
 *               referredEmail:
 *                 type: string
 *               referredPhone:
 *                 type: string
 *               course:
 *                 type: string
 *     responses:
 *       201:
 *         description: Referral created
 *       400:
 *         description: Missing required fields
 */
router.post("/", createReferral);

/**
 * @swagger
 * /referrals:
 *   get:
 *     summary: Get all referrals
 *     tags: [Referrals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all referrals
 */
router.get("/", protect, getReferrals);

/**
 * @swagger
 * /referrals/{id}:
 *   get:
 *     summary: Get referral by ID
 *     tags: [Referrals]
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
 *         description: Referral details
 *       404:
 *         description: Referral not found
 */
router.get("/:id", protect, getReferralById);

/**
 * @swagger
 * /referrals/{id}/status:
 *   put:
 *     summary: Update referral status
 *     tags: [Referrals]
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
 *               status:
 *                 type: string
 *                 enum: [pending, contacted, enrolled, commission-paid]
 *               commission:
 *                 type: number
 *     responses:
 *       200:
 *         description: Referral status updated
 *       404:
 *         description: Referral not found
 */
router.put("/:id/status", protect, updateReferralStatus);

/**
 * @swagger
 * /referrals/{id}:
 *   delete:
 *     summary: Delete a referral
 *     tags: [Referrals]
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
 *         description: Referral deleted
 *       404:
 *         description: Referral not found
 */
router.delete("/:id", protect, deleteReferral);

export default router;
