import pool from '../db';

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}

export async function getAll(): Promise<Student[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM students ORDER BY created_at DESC');
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getById(id: string): Promise<Student | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function create(data: Partial<Student>): Promise<Student> {
  const { name, email, phone, address } = data;
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO students (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, address]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function update(id: string, data: Partial<Student>): Promise<Student | null> {
  const { name, email, phone, address } = data;
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE students SET name = $1, email = $2, phone = $3, address = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
      [name, email, phone, address, id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function remove(id: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM students WHERE id = $1', [id]);
    return result.rowCount > 0;
  } finally {
    client.release();
  }
}
