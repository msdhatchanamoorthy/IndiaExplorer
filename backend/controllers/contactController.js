import Contact from "../Models/contactModel.js";
import sendEmail from "../utils/email.js";

export const sendContactMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        try {
            // Send notification to admin/themselves
            await sendEmail({
                email: process.env.EMAIL_USERNAME || "msdhatchanamoorthy001@gmail.com",
                subject: `New Contact Form Submission: ${subject}`,
                message: `You have received a new message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
            });
        } catch (emailErr) {
            console.log('Error sending notification email:', emailErr);
        }

        res.status(201).json({
            status: "success",
            message: "Message sent successfully!",
            contact: newContact,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message || "Something went wrong while sending the message"
        });
    }
};
