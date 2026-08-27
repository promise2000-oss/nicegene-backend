import { Router } from "express";
import {
  getGraduates,
  getGraduateById,
  createGraduate,
  updateGraduate,
  deleteGraduate,
} from "../controllers/graduateController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Graduates
 *   description: Academy graduates management
 */

/**
 * @swagger
 * /graduates:
 *   get:
 *     summary: Retrieve a list of academy graduates
 *     tags: [Graduates]
 *     responses:
 *       200:
 *         description: A list of graduates
 *   post:
 *     summary: Create a new graduate profile
 *     tags: [Graduates]
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
 *               - course
 *               - graduationYear
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               course:
 *                 type: string
 *               graduationYear:
 *                 type: integer
 *               grade:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               testimonial:
 *                 type: string
 *               linkedInUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Graduate profile created successfully
 */
router.get("/", getGraduates);
router.post("/", protect, upload.single("image"), createGraduate);

/**
 * @swagger
 * /graduates/{id}:
 *   get:
 *     summary: Get a graduate profile by ID
 *     tags: [Graduates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Graduate profile details
 *   put:
 *     summary: Update an existing graduate profile
 *     tags: [Graduates]
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
 *               course:
 *                 type: string
 *               graduationYear:
 *                 type: integer
 *               grade:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               testimonial:
 *                 type: string
 *               linkedInUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Graduate profile updated successfully
 *   delete:
 *     summary: Delete a graduate profile
 *     tags: [Graduates]
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
 *         description: Graduate profile deleted successfully
 */
router.get("/:id", getGraduateById);
router.put("/:id", protect, upload.single("image"), updateGraduate);
router.delete("/:id", protect, deleteGraduate);

export default router;
