import { Request, Response } from 'express';
import * as studentsService from '../services/studentsService';

export async function getAllStudents(req: Request, res: Response) {
  try {
    const students = await studentsService.getAll();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getStudentById(req: Request, res: Response) {
  try {
    const student = await studentsService.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createStudent(req: Request, res: Response) {
  try {
    const student = await studentsService.create(req.body);
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const student = await studentsService.update(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteStudent(req: Request, res: Response) {
  try {
    const deleted = await studentsService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
