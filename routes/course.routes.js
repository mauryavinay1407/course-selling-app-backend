const express=require("express");
const router=express.Router();
const {verifyjwt}=require("../middlewares/auth.middleware");
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse }=require("../controllers/course.controller");

router.get('/courses',getAllCourses);
router.post('/addcourse',verifyjwt,createCourse);
router.get('/course/:id',getCourseById);
router.put('/updatecourse/:id',verifyjwt,updateCourse);
router.delete('/deletecourse/:id',verifyjwt,deleteCourse);