import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/find/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;