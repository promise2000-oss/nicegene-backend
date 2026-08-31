import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job listings / Careers
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve all active job listings
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [full-time, part-time, contract, internship]
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of job listings
 */
router.get("/", getJobs);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job listing (admin)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               department:
 *                 type: string
 *               location:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [full-time, part-time, contract, internship]
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Job listing created
 */
router.post("/", protect, createJob);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job listing by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job details
 */
router.get("/:id", getJobById);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job listing (admin)
 *     tags: [Jobs]
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
 *               title:
 *                 type: string
 *               department:
 *                 type: string
 *               location:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [full-time, part-time, contract, internship]
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Job updated
 */
router.put("/:id", protect, updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job listing (admin)
 *     tags: [Jobs]
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
 *         description: Job deleted
 */
router.delete("/:id", protect, deleteJob);

export default router;
