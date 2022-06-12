import mongoose from "mongoose";
import { CustomAPIError } from "../utils/custom-error.js"

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if(err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json({ msg: err.message }) //422: unprocessable entity (used for validation errors)
  }

  //duplicate key is 11000. catch errors with duplicate email, username, any something unique.
  if ( err.code == 11000 ) {
    let field = Object.keys(err.keyValue)[0];
    let value = err.keyValue[field];
    return res.status(409).json({ msg: `Duplicate ${field} with value ${value}` }) //"Already Exists" would be '409 Conflict'.
  }

  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong, please try again';
  return res.status(errorStatus).json({ msg: errorMessage })
}

export default errorHandlerMiddleware