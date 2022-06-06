import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
const router = express.Router();

router.get("/", getHotels);
router.get("/find/:id", getHotel);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
