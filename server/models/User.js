import mongoose from "mongoose";

// var validateEmail = function(email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email)
// };

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      //validate: [validateEmail, 'Please fill a valid email address'], // We can use validate option or match option
      //validate: [ isEmail, 'invalid email' ], // or isEmail method from https://github.com/validatorjs/validator.js
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } //Will add createdAt and updatedAt fields
);

export default mongoose.model("User", UserSchema);
