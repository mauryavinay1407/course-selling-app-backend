const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    }
  },
  {
    timestamps:true
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
