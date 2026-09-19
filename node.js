const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gmail transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Portfolio backend is running successfully!");
});

// Contact form route
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Check required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        // Email sent to your Gmail
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "nikhilyadav55295@gmail.com",
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            text: `
You received a new message from your portfolio.

Name: ${name}
Email: ${email}

Message:
${message}
            `,
            html: `
                <h2>New Portfolio Message</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>

                <h3>Message:</h3>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
    console.error("========== EMAIL ERROR ==========");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    console.error("Message:", error.message);
    console.error("================================");

    res.status(500).json({
        success: false,
        message: error.message || "Email sending failed."
    });
}
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio backend running on port ${PORT}`);
});
