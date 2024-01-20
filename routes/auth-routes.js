import { Router } from "express";
import User from "../models/User.js";
import { signToken } from "../middlewares/sign-token.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (user) {
      res.status(400).json({ type: "FAIL", message: "User already exists..." });
      return;
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ type: "SUCCESS", message: "User Registered Successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ type: "FAIL", message: "Something is wrong with the server..." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);

    if (!user || !(await user.comparePassword(password))) {
      res
        .status(401)
        .json({
          type: "FAIL",
          message: "Username or password is incorrect...",
        });
        return;
    }

    const token = signToken({ username });

    res.json({ type: "SUCCESS", message: "Login Successful", token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ type: "FAIL", message: "Something wrong with the server..." });
  }
});

export default router;
