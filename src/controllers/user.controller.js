import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { email, username, interests } = req.body;
    if (!email || !username || !interests) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const exisingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (exisingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = await User.create({ email, username, interests });
    if (!newUser) {
      return res.status(400).json({ error: "User not created" });
    }
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};
