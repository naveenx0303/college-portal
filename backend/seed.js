// const mongoose = require('mongoose');
// require('dotenv').config();

// // Load models
// const User = require('./models/User');
// const Course = require('./models/Course');
// const CourseEnrollment = require('./models/CourseEnrollment');
// const Note = require('./models/Note');
// const Assessment = require('./models/Assessment');
// const AssessmentQuestion = require('./models/AssessmentQuestion');

// // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27018/college_portal', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://192.168.68.109:27017/college-portal', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function seed() {
//   try {
//     await mongoose.connection.db.dropDatabase();
//     console.log('✅ Database cleared');

//     // Create users
//     const teacher = await User.create({
//       email: 'teacher@example.com',
//       password_hash: 'password123',
//       first_name: 'Alice',
//       last_name: 'Smith',
//       role: 'teacher',
//       department: 'CSE'
//     });

//     const student = await User.create({
//       email: 'student@example.com',
//       password_hash: 'password123',
//       first_name: 'Bob',
//       last_name: 'Johnson',
//       role: 'student',
//       student_id: 'STD001',
//       department: 'CSE'
//     });

//     console.log('👤 Users created');

//     // Create course
//     const course = await Course.create({
//       course_code: 'CS101',
//       course_name: 'Intro to CS',
//       description: 'Basic concepts of Computer Science',
//       credits: 3,
//       semester: '1',
//       department: 'CSE',
//       teacher_id: teacher._id
//     });

//     // Enroll student
//     await CourseEnrollment.create({
//       student_id: student._id,
//       course_id: course._id
//     });

//     // Upload note
//     await Note.create({
//       course_id: course._id,
//       teacher_id: teacher._id,
//       title: 'Week 1 Notes',
//       file_name: 'week1.pdf',
//       file_path: '/uploads/notes/week1.pdf',
//       file_type: 'pdf',
//       file_size: 123456
//     });

//     // Create assessment
//     const assessment = await Assessment.create({
//       course_id: course._id,
//       teacher_id: teacher._id,
//       title: 'Midterm Exam',
//       description: 'Chapters 1-3',
//       assessment_type: 'objective',
//       total_marks: 10,
//       duration_minutes: 60,
//       start_time: new Date(),
//       end_time: new Date(Date.now() + 3600000),
//       is_published: true
//     });

//     await AssessmentQuestion.create({
//       assessment_id: assessment._id,
//       question_text: 'What is 2 + 2?',
//       question_type: 'mcq',
//       options: ['2', '3', '4', '5'],
//       correct_answer: '4',
//       marks: 5,
//       order_number: 1
//     });

//     console.log('📚 Course, Notes, Assessment created');
//     console.log('✅ Seeding complete');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seeding error:', error);
//     process.exit(1);
//   }
// }

// seed();

const mongoose = require('mongoose');
require('dotenv').config();

// Load models
const User = require('./models/User');
const Course = require('./models/Course');
const CourseEnrollment = require('./models/CourseEnrollment');
const Note = require('./models/Note');
const Assessment = require('./models/Assessment');
const AssessmentQuestion = require('./models/AssessmentQuestion');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://192.168.68.109:27017/college-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  try {
    //await mongoose.connection.db.dropDatabase();
    console.log('✅ Database cleared');

    // Create users
    const teacher1 = await User.create({
      email: 'teacher1@example.com',
      password_hash: 'password123',
      first_name: 'Alice',
      last_name: 'Smith',
      role: 'teacher',
      department: 'CSE'
    });

    const teacher2 = await User.create({
      email: 'teacher2@example.com',
      password_hash: 'password123',
      first_name: 'David',
      last_name: 'Clark',
      role: 'teacher',
      department: 'ECE'
    });

    const student1 = await User.create({
      email: 'student1@example.com',
      password_hash: 'password123',
      first_name: 'Bob',
      last_name: 'Johnson',
      role: 'student',
      student_id: 'STD001',
      department: 'CSE'
    });

    const student2 = await User.create({
      email: 'student2@example.com',
      password_hash: 'password123',
      first_name: 'Emma',
      last_name: 'Davis',
      role: 'student',
      student_id: 'STD002',
      department: 'ECE'
    });

    console.log('👤 Users created');

    // Create courses
    const course1 = await Course.create({
      course_code: 'CS101',
      course_name: 'Intro to CS',
      description: 'Basic concepts of Computer Science',
      credits: 3,
      semester: '1',
      department: 'CSE',
      teacher_id: teacher1._id
    });

    const course2 = await Course.create({
      course_code: 'ECE201',
      course_name: 'Digital Systems',
      description: 'Fundamentals of digital circuits',
      credits: 4,
      semester: '3',
      department: 'ECE',
      teacher_id: teacher2._id
    });

    // Enroll students
    await CourseEnrollment.create({ student_id: student1._id, course_id: course1._id });
    await CourseEnrollment.create({ student_id: student2._id, course_id: course2._id });

    // Upload notes
    await Note.create({
      course_id: course1._id,
      teacher_id: teacher1._id,
      title: 'Week 1 Notes',
      file_name: 'week1.pdf',
      file_path: '/uploads/notes/week1.pdf',
      file_type: 'pdf',
      file_size: 123456
    });

    await Note.create({
      course_id: course2._id,
      teacher_id: teacher2._id,
      title: 'Logic Gates',
      file_name: 'gates.pdf',
      file_path: '/uploads/notes/gates.pdf',
      file_type: 'pdf',
      file_size: 98765
    });

    // Create assessments
    const assessment1 = await Assessment.create({
      course_id: course1._id,
      teacher_id: teacher1._id,
      title: 'Midterm Exam',
      description: 'Chapters 1-3',
      assessment_type: 'objective',
      total_marks: 10,
      duration_minutes: 60,
      start_time: new Date(),
      end_time: new Date(Date.now() + 3600000),
      is_published: true
    });

    const assessment2 = await Assessment.create({
      course_id: course2._id,
      teacher_id: teacher2._id,
      title: 'Quiz 1',
      description: 'Logic Gates and Circuits',
      assessment_type: 'objective',
      total_marks: 20,
      duration_minutes: 45,
      start_time: new Date(),
      end_time: new Date(Date.now() + 2700000),
      is_published: true
    });

    // Add questions
    await AssessmentQuestion.insertMany([
      {
        assessment_id: assessment1._id,
        question_text: 'What is 2 + 2?',
        question_type: 'mcq',
        options: ['2', '3', '4', '5'],
        correct_answer: '4',
        marks: 5,
        order_number: 1
      },
      {
        assessment_id: assessment2._id,
        question_text: 'Which of these is a universal gate?',
        question_type: 'mcq',
        options: ['AND', 'OR', 'NAND', 'XOR'],
        correct_answer: 'NAND',
        marks: 10,
        order_number: 1
      }
    ]);

    console.log('📚 Courses, Notes, Assessments, and Questions created');
    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
