const { asyncHandler } = require("../utils/asyncHandler");
const { courseFormat } = require("../utils/zodValidation");
const { Course } = require("../models/course.model");

// Create a Course
const createCourse = asyncHandler(async (req, res) => {
  const { title, url, price } = req.body;
  const obj = req.body;

  // Validate the request body format
  const validateData = courseFormat.safeParse(obj);
  if (!validateData.success) {
    return res.status(411).json({
      message: "Please enter the data in the correct format",
      errors: validateData.error,
    });
  }

  // Check whether the course title already exists
  const isCourseExist = await Course.findOne({ title: title });
  if (isCourseExist)
    throw new Error("Course with this title already exists, try a different title");

  // Saving the course data in the database
  const savedCourse = await Course.create({
    title,
    url,
    price,
  });

  res.status(200).json(savedCourse);
});

// Get All Courses
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  res.status(200).json({
    success: true,
    data: courses,
  });
});

// Get a Course by ID
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.status(200).json(course);
});

// Update a Course
const updateCourse = asyncHandler(async (req, res) => {
  const { title, url, price } = req.body;
  const obj = req.body;

  // Validate the request body format
  const validateData = courseFormat.safeParse(obj);
  if (!validateData.success) {
    return res.status(411).json({
      message: "Please enter the data in the correct format",
      errors: validateData.error,
    });
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { title, url, price },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.status(200).json(updatedCourse);
});

// Delete a Course
const deleteCourse = asyncHandler(async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id);

  if (!deletedCourse) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

module.exports = { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse };
