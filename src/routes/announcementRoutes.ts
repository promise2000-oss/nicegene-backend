import { Router } from "express";
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Homepage announcement bar
 */

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Retrieve active announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: A list of announcements
 */
router.get("/", getAnnouncements);

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a new announcement (admin)
 *     tags: [Announcements]
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
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               link:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Announcement created
 */
router.post("/", protect, createAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get an announcement by ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement details
 */
router.get("/:id", getAnnouncementById);

/**
 * @swagger
 * /announcements/{id}:
 *   put:
 *     summary: Update an announcement (admin)
 *     tags: [Announcements]
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
 *               message:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               link:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Announcement updated
 */
router.put("/:id", protect, updateAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete an announcement (admin)
 *     tags: [Announcements]
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
 *         description: Announcement deleted
 */
router.delete("/:id", protect, deleteAnnouncement);

export default router;
