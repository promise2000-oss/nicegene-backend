import { Request, Response } from "express";
import { Contact } from "../models/Contact";
import { sendContactNotification } from "../services/emailService";
export const submitContactForm = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res
        .status(400)
        .json({
          message:
            "All contact fields (name, email, subject, message) are required",
        });
      return;
    }
    const contact = await Contact.create({ name, email, subject, message });

    // Send notification email asynchronously
    sendContactNotification({ name, email, subject, message })
      .then((sent) => {
        if (!sent) console.warn('Failed to send contact notification email');
      })
      .catch((err) => console.error('Error triggered in sending contact email:', err));

    res.status(201).json({
      message: 'Your inquiry has been submitted successfully!',
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error: (error as Error).message });
  }
};

export const getContactSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact submissions', error: (error as Error).message });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.json({ message: "Contact submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact submission", error: (error as Error).message });
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: 'Submission not found' });
      return;
    }
    contact.isRead = true;
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error marking submission as read', error: (error as Error).message });
  }
};
