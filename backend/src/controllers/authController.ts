import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
