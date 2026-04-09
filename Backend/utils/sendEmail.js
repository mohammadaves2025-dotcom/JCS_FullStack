import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // 1. Create a transporter (Using Gmail for now, but you can plug in SendGrid/AWS later)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER, // e.g., yourclient@gmail.com
            pass: process.env.EMAIL_PASS, // App Password from Google
        },
    });

    // 2. Define the email options
    const mailOptions = {
        from: `Consultancy Admin <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional: for branded HTML emails
    };

    // 3. Actually send the email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;