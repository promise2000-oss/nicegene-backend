import { Router } from "express";
import {
  getGadgets,
  getGadgetById,
  createGadget,
  updateGadget,
  deleteGadget,
} from "../controllers/gadgetController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: Gadgets product catalog
 */

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Retrieve all active gadgets
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of gadgets
 */
router.get("/", getGadgets);

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Create a new gadget (admin)
 *     tags: [Gadgets]
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
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Gadget created
 */
router.post("/", protect, upload.single("image"), createGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   get:
 *     summary: Get a gadget by ID
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget details
 */
router.get("/:id", getGadgetById);

/**
 * @swagger
 * /gadgets/{id}:
 *   put:
 *     summary: Update a gadget (admin)
 *     tags: [Gadgets]
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Gadget updated
 */
router.put("/:id", protect, upload.single("image"), updateGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Delete a gadget (admin)
 *     tags: [Gadgets]
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
 *         description: Gadget deleted
 */
router.delete("/:id", protect, deleteGadget);

export default router;
