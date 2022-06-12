import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", verifyAdmin, getUsers);
router.get("/find/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

export default router;