import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // console.log(name,email,password);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    // console.log(salt);

    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword)

   const user= await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully",user });
    // res.status(200).json({ name, email, password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found " });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    // console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(token);

    res.json({
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });

    res.status(200).json({ email, password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userProfile = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
