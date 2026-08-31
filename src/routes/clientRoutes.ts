import { Router } from "express";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Clients management
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retrieve all active clients
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: industry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of clients
 */
router.get("/", getClients);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client (admin)
 *     tags: [Clients]
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
 *               industry:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created
 */
router.post("/", protect, upload.single("logo"), createClient);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client details
 */
router.get("/:id", getClientById);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update a client (admin)
 *     tags: [Clients]
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
 *               industry:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Client updated
 */
router.put("/:id", protect, upload.single("logo"), updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client (admin)
 *     tags: [Clients]
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
 *         description: Client deleted
 */
router.delete("/:id", protect, deleteClient);

export default router;
