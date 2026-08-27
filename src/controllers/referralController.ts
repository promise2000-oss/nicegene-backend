import { Response } from "express";
import { Referral } from "../models/Referral";
import { AuthRequest } from "../middleware/authMiddleware";

const generateReferralCode = (): string => {
  return `REF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
};

export const createReferral = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { referrerName, referrerEmail, referredName, referredEmail, referredPhone, course } = req.body;

    if (!referrerName || !referrerEmail || !referredName || !referredEmail) {
      res.status(400).json({ message: "Referrer and referred details are required" });
      return;
    }

    const referral = await Referral.create({
      referrerName,
      referrerEmail,
      referredName,
      referredEmail,
      referredPhone,
      course,
      referralCode: generateReferralCode(),
    });

    res.status(201).json(referral);
  } catch (error) {
    res.status(500).json({
      message: "Error creating referral",
      error: (error as Error).message,
    });
  }
};

export const getReferrals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referrals = await Referral.find().sort({ createdAt: -1 });
    res.json(referrals);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching referrals",
      error: (error as Error).message,
    });
  }
};

export const getReferralById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) {
      res.status(404).json({ message: "Referral not found" });
      return;
    }
    res.json(referral);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching referral",
      error: (error as Error).message,
    });
  }
};

export const updateReferralStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, commission } = req.body;
    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      res.status(404).json({ message: "Referral not found" });
      return;
    }

    if (status) referral.status = status;
    if (commission !== undefined) referral.commission = commission;

    await referral.save();
    res.json(referral);
  } catch (error) {
    res.status(500).json({
      message: "Error updating referral status",
      error: (error as Error).message,
    });
  }
};
