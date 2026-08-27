import { Response } from "express";
import { Payment } from "../models/Payment";
import { Registration } from "../models/Registration";
import { AuthRequest } from "../middleware/authMiddleware";

export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reference, amount, email, gateway, registrationId } = req.body;

    if (!reference) {
      res.status(400).json({ message: "Payment reference is required" });
      return;
    }

    const existingPayment = await Payment.findOne({ reference });
    if (existingPayment) {
      res.status(400).json({ message: "Payment reference already verified" });
      return;
    }

    // TODO: Integrate real Paystack/Flutterwave verification API here
    // For now, we mark the payment as verified
    const payment = await Payment.create({
      reference,
      amount: amount || 0,
      email: email || "",
      status: "verified",
      gateway: gateway || "manual",
    });

    // Update registration status if linked
    if (registrationId) {
      await Registration.findByIdAndUpdate(registrationId, { status: "confirmed" });
    }

    res.status(201).json({
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error verifying payment",
      error: (error as Error).message,
    });
  }
};

export const getPaymentByReference = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const payment = await Payment.findOne({ reference: req.params.reference });
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment",
      error: (error as Error).message,
    });
  }
};
