import { Request, Response } from "express";
import { Event } from "../models/Event";

export const getEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: (error as Error).message,
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching event",
      error: (error as Error).message,
    });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, type, date, description } = req.body;
    const files = req.files as Express.Multer.File[] | undefined;
    const images = files
      ? files.map((f) => `/uploads/${f.filename}`)
      : [];
    const event = await Event.create({ title, type, date, description, images });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: (error as Error).message,
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, type, date, description } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    if (title !== undefined) event.title = title;
    if (type !== undefined) event.type = type;
    if (date !== undefined) event.date = date;
    if (description !== undefined) event.description = description;
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      event.images = files.map((f) => `/uploads/${f.filename}`);
    }
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error updating event",
      error: (error as Error).message,
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting event",
      error: (error as Error).message,
    });
  }
};

export const rsvpToEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    const { name, email, phone, attending, guestCount } = req.body;
    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }
    const existingRsvp = event.rsvps?.find((r) => r.email === email.toLowerCase());
    if (existingRsvp) {
      existingRsvp.name = name;
      existingRsvp.phone = phone;
      existingRsvp.attending = attending !== undefined ? attending : true;
      existingRsvp.guestCount = guestCount || 1;
    } else {
      event.rsvps = event.rsvps || [];
      event.rsvps.push({
        name,
        email: email.toLowerCase(),
        phone,
        attending: attending !== undefined ? attending : true,
        guestCount: guestCount || 1,
        submittedAt: new Date(),
      });
    }
    await event.save();
    res.json({ message: "RSVP submitted successfully", event });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting RSVP",
      error: (error as Error).message,
    });
  }
};
