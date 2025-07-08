// routes/courses.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const CourseEnrollment = require('../models/CourseEnrollment');
const User = require('../models/User');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    let courses;
    
    if (req.user.role === 'student') {
      // Get enrolled courses for students
      const enrollments = await CourseEnrollment.find({
        student_id: req.user._id,
        status: 'enrolled'
      }).populate({
        path: 'course_id',
        populate: {
          path: 'teacher_id',
          select: 'first_name last_name email'
        }
      });
      
      courses = enrollments.map(enrollment => enrollment.course_id);
    } else if (req.user.role === 'teacher') {
      // Get courses taught by the teacher
      courses = await Course.find({
        teacher_id: req.user._id,
        is_active: true
      }).populate('teacher_id', 'first_name last_name email');
    } else {
      // Admin can see all courses
      courses = await Course.find({ is_active: true })
        .populate('teacher_id', 'first_name last_name email');
    }

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_code
 *               - course_name
 *               - teacher_id
 *             properties:
 *               course_code:
 *                 type: string
 *               course_name:
 *                 type: string
 *               description:
 *                 type: string
 *               credits:
 *                 type: number
 *               semester:
 *                 type: string
 *               department:
 *                 type: string
 *               teacher_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', [authMiddleware, roleMiddleware(['admin'])], [
  body('course_code').notEmpty(),
  body('course_name').notEmpty(),
  body('teacher_id').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { course_code, course_name, description, credits, semester, department, teacher_id } = req.body;

    // Check if course code already exists
    const existingCourse = await Course.findOne({ course_code });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course code already exists'
      });
    }

    // Verify teacher exists
    const teacher = await User.findById(teacher_id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({
        success: false,
        message: 'Invalid teacher ID'
      });
    }

    const course = new Course({
      course_code,
      course_name,
      description,
      credits,
      semester,
      department,
      teacher_id
    });

    await course.save();
    await course.populate('teacher_id', 'first_name last_name email');

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @swagger
 * /api/courses/{id}/enroll:
 *   post:
 *     summary: Enroll student in a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Enrolled successfully
 *       400:
 *         description: Bad request
 */
router.post('/:id/enroll', [authMiddleware, roleMiddleware(['student'])], async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await CourseEnrollment.findOne({
      student_id: studentId,
      course_id: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    const enrollment = new CourseEnrollment({
      student_id: studentId,
      course_id: courseId
    });

    await enrollment.save();

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course details
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details retrieved successfully
 *       404:
 *         description: Course not found
 */

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher_id', 'first_name last_name email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});