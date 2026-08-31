import { Request, Response } from "express";
import { Gadget } from "../models/Gadget";

export const getGadgets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, inStock } = req.query;
    const filter: Record<string, any> = { isActive: true };
    if (category) filter.category = category;
    if (inStock === "true") filter.inStock = true;
    if (inStock === "false") filter.inStock = false;
    const gadgets = await Gadget.find(filter).sort({ name: 1 });
    res.json(gadgets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gadgets", error: (error as Error).message });
  }
};

export const getGadgetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) { res.status(404).json({ message: "Gadget not found" }); return; }
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gadget", error: (error as Error).message });
  }
};

export const createGadget = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const image = files && files.length > 0 ? `/uploads/${files[0].filename}` : undefined;
    const { name, description, price, category, inStock } = req.body;
    const gadget = await Gadget.create({ name, description, price, image, category, inStock });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ message: "Error creating gadget", error: (error as Error).message });
  }
};

export const updateGadget = async (req: Request, res: Response): Promise<void> => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) { res.status(404).json({ message: "Gadget not found" }); return; }
    const { name, description, price, category, inStock, isActive } = req.body;
    if (name !== undefined) gadget.name = name;
    if (description !== undefined) gadget.description = description;
    if (price !== undefined) gadget.price = price;
    if (category !== undefined) gadget.category = category;
    if (inStock !== undefined) gadget.inStock = inStock;
    if (isActive !== undefined) gadget.isActive = isActive;
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) gadget.image = `/uploads/${files[0].filename}`;
    await gadget.save();
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ message: "Error updating gadget", error: (error as Error).message });
  }
};

export const deleteGadget = async (req: Request, res: Response): Promise<void> => {
  try {
    const gadget = await Gadget.findByIdAndDelete(req.params.id);
    if (!gadget) { res.status(404).json({ message: "Gadget not found" }); return; }
    res.json({ message: "Gadget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting gadget", error: (error as Error).message });
  }
};
