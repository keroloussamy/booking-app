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

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  const list = await Promise.all(
    cities.map(async city => {
      return Hotel.countDocuments({ city }); //countDocuments return just count without the data, so it's faster.
    })
  );

  res.status(200).json(list);
}

export const countByType = async (req, res, next) => {

  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "apartments", count: apartmentCount },
    { type: "resorts", count: resortCount },
    { type: "villas", count: villaCount },
    { type: "cabins", count: cabinCount },
  ]);
};


export const getHotelRooms = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  res.status(200).json(list)
};