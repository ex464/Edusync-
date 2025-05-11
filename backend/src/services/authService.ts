import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface RegisterInput {
  email: string;
  password: string;
  role?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function register(data: RegisterInput) {
  const { email, password, role = 'user' } = data;

  const client = await pool.connect();
  try {
    const userCheck = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, hashedPassword, role]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function login(data: LoginInput) {
  const { email, password } = data;

  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, email, password, role FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      throw new Error('Invalid credentials');
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return token;
  } finally {
    client.release();
  }
}
