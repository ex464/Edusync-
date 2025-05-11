import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentsController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('admin', 'teacher'), getAllStudents);
router.get('/:id', authorizeRoles('admin', 'teacher'), getStudentById);
router.post('/', authorizeRoles('admin'), createStudent);
router.put('/:id', authorizeRoles('admin'), updateStudent);
router.delete('/:id', authorizeRoles('admin'), deleteStudent);

export default router;
