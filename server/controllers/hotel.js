import Hotel from "../models/Hotel.js";
import { createCustomError } from "../utils/custom-error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  const savedHotel = await newHotel.save(); // or await Hotel.create(req.body) directly
  res.status(201).json(savedHotel); // 201: Created
};

export const updateHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;
  /* 
  Difference between findOneAndUpdate and findByIdAndUpdate is that the first one takes an id as the first param,
  whereas the second one takes a conditions object / query (so you can search by name or any field else than Id).
  */
  
  //const updatedHotel = await Hotel.findOneAndUpdate({ _id: hotelID }, req.body, { new: true, runValidators: true });
  const updatedHotel = await Hotel.findByIdAndUpdate(
    hotelID,
    req.body, // or { $set: req.body }
    { 
      new: true, // true to return the modified document rather than the original. defaults to false.
      runValidators: true // will check the schema validations for the new data. defaults to false.
    }
  );

  if (!updatedHotel) {
    return next(createCustomError(`Hotel With this id: ${hotelID} doesn't exist.`, 404))
  }
  
  res.status(200).json(updatedHotel); // or res.status(204).json({}) if you don't want to return anything.
  /* 
    In update REST api you can return (200 OK) with the updated document or (204 No Content) with nothing.
  */
};

export const deleteHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;
  const hotel = await Hotel.findByIdAndDelete(hotelID);
  
  if (!hotel) {
    return next(createCustomError(`Hotel With this id: ${hotelID} doesn't exist.`, 404))
  }

  res.status(200).json("Hotel has been deleted.");
  /* 
  200 (OK) if the response includes an entity describing the status.
  202 (Accepted) if the action has been queued.
  204 (No Content) if the response does not include an entity describing the status.
  */
};

export const getHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;
  const hotel = await Hotel.findById(hotelID);

  if (!hotel) {
    return next(createCustomError(`Hotel With this id: ${hotelID} doesn't exist.`, 404))
  }
  res.status(200).json(hotel);
};

export const getHotels = async (req, res, next) => {
  const hotels = await Hotel.find({});
  res.status(200).json(hotels);
};