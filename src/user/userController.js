import { generateToken } from "../utils/jwt.js";
import userService from "./userService.js";
import bcrypt from "bcryptjs";

const userController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          error: "이미 존재하는 이메일 입니다. 다른 이메일로 가입해주세요",
        });
      }

      const hashedPassword = await userService.hashPassword(password);

      const newUser = await userService.createUser({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "성공적으로 회원가입을 하셨습니다!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: "유저가 존재하지 않습니다" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "유효하지 않은 비밀번호 입니다" });
      }

      const token = generateToken(user);

      res.status(200).json({ token, _id: user._id });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    const { name, phoneNumber, selfIntro, password } = req.body;
    const userId = req.user._id;
    const files = req.files || [];

    const image = files.map((file) => {
      return `${file.path}`.replace("public/", "");
    });

    try {
      const updatedUser = await userService.updateUser(userId, {
        name,
        phoneNumber,
        selfIntro,
        password,
        image,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.user._id;

    try {
      const deletedUser = await userService.deleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getMyInfo: async (req, res) => {
    const userId = req.user._id;
    try {
      const userInfo = await userService.getUserInfo(userId);
      if (userInfo) {
        res.status(200).json(userInfo);
      } else {
        res.status(404).json({ message: "유저를 찾을수 없음" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
