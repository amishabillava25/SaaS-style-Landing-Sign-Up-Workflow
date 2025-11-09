const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// --- Connect MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// --- Signup API ---
app.post("/signup", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).json({ message: "All fields required" });

    // Save user in DB
    const user = new User({ name, email });
    await user.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to LaunchPad 🚀",
      text: `Hi ${name},\n\nThanks for signing up! You're now part of LaunchPad.\n\nCheers,\nTeam LaunchPad`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Signup successful! Confirmation email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
