import mongoose from "mongoose";
import { CustomAPIError } from "../utils/custom-error.js"

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if(err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json({ msg: err.message }) //422: unprocessable entity (used for validation errors)
  }

  console.log(err.properties);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong, please try again';
  return res.status(errorStatus).json({ msg: errorMessage })
}

export default errorHandlerMiddleware