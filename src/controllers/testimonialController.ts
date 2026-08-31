import { Request, Response } from "express";
import { Testimonial } from "../models/Testimonial";

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, section, featured } = req.query;
    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    else filter.status = "approved";
    if (section) filter.section = section;
    if (featured === "true") filter.isFeatured = true;
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error: (error as Error).message });
  }
};

export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) { res.status(404).json({ message: "Testimonial not found" }); return; }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonial", error: (error as Error).message });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, content, image, rating, section } = req.body;
    const testimonial = await Testimonial.create({ name, role, content, image, rating, section });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Error creating testimonial", error: (error as Error).message });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, content, image, rating, section, status, isFeatured } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) { res.status(404).json({ message: "Testimonial not found" }); return; }
    if (name !== undefined) testimonial.name = name;
    if (role !== undefined) testimonial.role = role;
    if (content !== undefined) testimonial.content = content;
    if (image !== undefined) testimonial.image = image;
    if (rating !== undefined) testimonial.rating = rating;
    if (section !== undefined) testimonial.section = section;
    if (status !== undefined) testimonial.status = status;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;
    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Error updating testimonial", error: (error as Error).message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) { res.status(404).json({ message: "Testimonial not found" }); return; }
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial", error: (error as Error).message });
  }
};
