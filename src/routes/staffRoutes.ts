import { Router } from "express";
import {
  getStaffList,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: Staff members management
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Retrieve a list of staff members
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: A list of staff members
 *   post:
 *     summary: Create a new staff member profile
 *     tags: [Staff]
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
 *               - email
 *               - dateOfBirth
 *               - role
 *               - department
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               role:
 *                 type: string
 *               department:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [executive, staff]
 *                 default: staff
 *               image:
 *                 type: string
 *                 format: binary
 *               isActive:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Staff member created successfully
 */
router.get("/", getStaffList);
router.post("/", protect, upload.single("image"), createStaff);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get a staff member by ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff member details
 *   put:
 *     summary: Update an existing staff member profile
 *     tags: [Staff]
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
 *               email:
 *                 type: string
 *                 format: email
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               role:
 *                 type: string
 *               department:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [executive, staff]
 *               image:
 *                 type: string
 *                 format: binary
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *   delete:
 *     summary: Delete a staff member profile
 *     tags: [Staff]
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
 *         description: Staff member deleted successfully
 */
router.get("/:id", getStaffById);
router.put("/:id", protect, upload.single("image"), updateStaff);
router.delete("/:id", protect, deleteStaff);

export default router;
