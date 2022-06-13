import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();

  const hotel = await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id }}, { new: true, runValidators: true });
  if (!hotel) {
    return next(createCustomError(`Hotel With this id: ${hotelId} doesn't exist.`, 404))
  }
  
  res.status(201).json(savedRoom);
};


export const updateRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  const updatedRoom = await Room.findByIdAndUpdate(roomID, req.body, { new: true, runValidators: true });
  if (!updatedRoom) {
    return next(createCustomError(`Room With this id: ${roomID} doesn't exist.`, 404))
  }
  res.status(200).json(updatedRoom);
};

export const deleteRoom = async (req, res, next) => {
  const { id: roomID, hotelId } = req.params;
  const room = await Room.findByIdAndDelete(roomID);
  if (!room) {
    return next(createCustomError(`Room With this id: ${roomID} doesn't exist.`, 404))
  }

  const hotel = await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomID } }, { new: true, runValidators: true });
  if (!hotel) {
    return next(createCustomError(`Hotel With this id: ${hotelId} doesn't exist.`, 404))
  }

  res.status(200).json("Room has been deleted.");
};

export const getRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  const room = await Room.findById(roomID);

  if (!room) {
    return next(createCustomError(`Room With this id: ${roomID} doesn't exist.`, 404))
  }
  res.status(200).json(room);
};

export const getRooms = async (req, res, next) => {
  const rooms = await Room.find({});
  res.status(200).json(rooms);
};