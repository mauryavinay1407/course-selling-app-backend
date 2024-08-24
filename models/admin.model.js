const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minLength: 3,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
  },
  {
    timestamps:true
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
