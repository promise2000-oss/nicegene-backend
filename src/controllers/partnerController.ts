import { Request, Response } from "express";
import { Partner } from "../models/Partner";

export const getPartners = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter: Record<string, any> = { isActive: true };
    if (category) filter.category = category;
    const partners = await Partner.find(filter).sort({ name: 1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error: (error as Error).message });
  }
};

export const getPartnerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) { res.status(404).json({ message: "Partner not found" }); return; }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partner", error: (error as Error).message });
  }
};

export const createPartner = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const logo = files && files.length > 0 ? `/uploads/${files[0].filename}` : undefined;
    const { name, website, description, category } = req.body;
    const partner = await Partner.create({ name, logo, website, description, category });
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error creating partner", error: (error as Error).message });
  }
};

export const updatePartner = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) { res.status(404).json({ message: "Partner not found" }); return; }
    const { name, website, description, category, isActive } = req.body;
    if (name !== undefined) partner.name = name;
    if (website !== undefined) partner.website = website;
    if (description !== undefined) partner.description = description;
    if (category !== undefined) partner.category = category;
    if (isActive !== undefined) partner.isActive = isActive;
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) partner.logo = `/uploads/${files[0].filename}`;
    await partner.save();
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error updating partner", error: (error as Error).message });
  }
};

export const deletePartner = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) { res.status(404).json({ message: "Partner not found" }); return; }
    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error: (error as Error).message });
  }
};
