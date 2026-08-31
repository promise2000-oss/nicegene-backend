import { Request, Response } from "express";
import { Client } from "../models/Client";

export const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const { industry } = req.query;
    const filter: Record<string, any> = { isActive: true };
    if (industry) filter.industry = industry;
    const clients = await Client.find(filter).sort({ name: 1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error: (error as Error).message });
  }
};

export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) { res.status(404).json({ message: "Client not found" }); return; }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error fetching client", error: (error as Error).message });
  }
};

export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const logo = files && files.length > 0 ? `/uploads/${files[0].filename}` : undefined;
    const { name, website, industry, description } = req.body;
    const client = await Client.create({ name, logo, website, industry, description });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error: (error as Error).message });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) { res.status(404).json({ message: "Client not found" }); return; }
    const { name, website, industry, description, isActive } = req.body;
    if (name !== undefined) client.name = name;
    if (website !== undefined) client.website = website;
    if (industry !== undefined) client.industry = industry;
    if (description !== undefined) client.description = description;
    if (isActive !== undefined) client.isActive = isActive;
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) client.logo = `/uploads/${files[0].filename}`;
    await client.save();
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error: (error as Error).message });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) { res.status(404).json({ message: "Client not found" }); return; }
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error: (error as Error).message });
  }
};
