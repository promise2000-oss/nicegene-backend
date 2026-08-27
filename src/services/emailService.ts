import {
  nodemailerTransporter,
  resendClient,
  emailFrom,
  useResend,
} from "../config/email";
interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}
export const sendEmail = async ({
  to,
  subject,
  html,
}: SendMailOptions): Promise<boolean> => {
  try {
    if (useResend && resendClient) {
      const { data, error } = await resendClient.emails.send({
        from: emailFrom,
        to: [to],
        subject,
        html,
      });
      if (error) {
        console.error("Error sending email via Resend:", error);
        return false;
      }
      console.log("Email sent successfully via Resend:", data?.id);
      return true;
    } else {
      const info = await nodemailerTransporter.sendMail({
        from: emailFrom,
        to,
        subject,
        html,
      });
      console.log("Email sent successfully via Nodemailer:", info.messageId);
      return true;
    }
  } catch (error) {
    console.error("Error in sendEmail service:", error);
    return false;
  }
};
export const sendBirthdayEmail = async (
  to: string,
  staffName: string,
): Promise<boolean> => {
  const subject = `Happy Birthday, ${staffName}! 🎂🎉`;
  const html = `    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">      <h2 style="color: #2b6cb0; text-align: center;">Happy Birthday, ${staffName}! 🎂</h2>      <p>Dear ${staffName},</p>      <p>On behalf of the entire team at <strong>Nicegene</strong>, we want to wish you a very happy birthday!</p>      <p>Thank you for all your hard work, dedication, and the amazing energy you bring to our team every day. We hope your day is filled with joy, laughter, and all the things you love most.</p>      <div style="text-align: center; margin: 30px 0;">        <span style="font-size: 50px;">🎉 🍰 🎁 ✨</span>      </div>      <p>Have a wonderful celebration!</p>      <p>Warmest regards,<br/><strong>The Nicegene Team</strong></p>    </div>  `;
  return sendEmail({ to, subject, html });
};
export const sendContactNotification = async (contactDetails: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  const subject = `New Contact Form Submission: ${contactDetails.subject}`;
  const html = `    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">      <h2 style="color: #2c5282;">New Inquiry Received</h2>      <p><strong>Name:</strong> ${contactDetails.name}</p>      <p><strong>Email:</strong> ${contactDetails.email}</p>      <p><strong>Subject:</strong> ${contactDetails.subject}</p>      <p><strong>Message:</strong></p>      <div style="background-color: #f7fafc; padding: 15px; border-left: 4px solid #4299e1; margin-bottom: 20px;">        ${contactDetails.message.replace(/\n/g, "<br/>")}      </div>      <p style="font-size: 12px; color: #718096;">This email was automatically generated from the Nicegene Website Contact Form.</p>    </div>  `;
  // Send to company admin email (can be configured in process.env.ADMIN_EMAIL)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nicegene.com';
  return sendEmail({ to: adminEmail, subject, html });
};
