import { Router } from "express";
import {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Partners
 *   description: Partners management
 */

/**
 * @swagger
 * /partners:
 *   get:
 *     summary: Retrieve all active partners
 *     tags: [Partners]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of partners
 */
router.get("/", getPartners);

/**
 * @swagger
 * /partners:
 *   post:
 *     summary: Create a new partner (admin)
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               website:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Partner created
 */
router.post("/", protect, upload.single("logo"), createPartner);

/**
 * @swagger
 * /partners/{id}:
 *   get:
 *     summary: Get a partner by ID
 *     tags: [Partners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Partner details
 */
router.get("/:id", getPartnerById);

/**
 * @swagger
 * /partners/{id}:
 *   put:
 *     summary: Update a partner (admin)
 *     tags: [Partners]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               website:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Partner updated
 */
router.put("/:id", protect, upload.single("logo"), updatePartner);

/**
 * @swagger
 * /partners/{id}:
 *   delete:
 *     summary: Delete a partner (admin)
 *     tags: [Partners]
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
 *         description: Partner deleted
 */
router.delete("/:id", protect, deletePartner);

export default router;
