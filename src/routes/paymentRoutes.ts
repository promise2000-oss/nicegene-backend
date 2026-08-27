import { Router } from "express";
import { verifyPayment, getPaymentByReference } from "../controllers/paymentController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment verification
 */

/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify a payment transaction
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reference
 *             properties:
 *               reference:
 *                 type: string
 *               amount:
 *                 type: number
 *               email:
 *                 type: string
 *               gateway:
 *                 type: string
 *                 enum: [paystack, flutterwave, manual]
 *               registrationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment verified
 *       400:
 *         description: Invalid or duplicate reference
 */
router.post("/verify", verifyPayment);

/**
 * @swagger
 * /payments/{reference}:
 *   get:
 *     summary: Get payment by reference
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get("/:reference", getPaymentByReference);

export default router;
