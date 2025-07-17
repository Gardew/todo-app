import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Registrace
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Uživatel již existuje" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    res.status(201).json({ message: "Registrováno" });
  } catch (err) {
    res.status(500).json({ message: "Chyba serveru" });
  }
});

// Přihlášení
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Uživatel nenalezen" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Špatné heslo" });

    res.json({ email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Chyba serveru" });
  }
});

export default router;
