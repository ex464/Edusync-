
-- This file contains the database functions needed for our fees module

-- Function to get fee breakdown for the current user
CREATE OR REPLACE FUNCTION public.get_fee_breakdown()
RETURNS SETOF json
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    json_build_object(
      'id', fc.id,
      'name', fc.name,
      'fee_structures', (
        SELECT json_agg(json_build_object('amount', fs.amount))
        FROM fee_structures fs
        WHERE fs.category_id = fc.id
        LIMIT 1
      ),
      'student_fees', (
        SELECT json_agg(json_build_object(
          'paid_amount', sf.paid_amount,
          'status', sf.status
        ))
        FROM student_fees sf
        JOIN fee_structures fs ON sf.structure_id = fs.id
        WHERE fs.category_id = fc.id AND sf.student_id = auth.uid()
        LIMIT 1
      )
    )
  FROM fee_categories fc;
$$;

-- Function to get fees summary for the current user
CREATE OR REPLACE FUNCTION public.get_fees_summary()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    json_build_object(
      'total_amount', SUM(sf.total_amount),
      'paid_amount', SUM(sf.paid_amount),
      'due_amount', SUM(sf.due_amount),
      'status', (
        CASE 
          WHEN SUM(sf.paid_amount) = 0 THEN 'unpaid'
          WHEN SUM(sf.paid_amount) < SUM(sf.total_amount) THEN 'partial'
          ELSE 'paid'
        END
      ),
      'due_date', MIN(sf.due_date)
    )
  FROM student_fees sf
  WHERE sf.student_id = auth.uid();
$$;

-- Function to get payment history for the current user
CREATE OR REPLACE FUNCTION public.get_payment_history()
RETURNS SETOF json
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    json_build_object(
      'id', fp.id,
      'amount', fp.amount,
      'payment_method', fp.payment_method,
      'payment_status', fp.payment_status,
      'receipt_url', fp.receipt_url,
      'payment_date', fp.payment_date
    )
  FROM fee_payments fp
  JOIN student_fees sf ON fp.student_fee_id = sf.id
  WHERE sf.student_id = auth.uid()
  ORDER BY fp.payment_date DESC;
$$;

-- Seed some sample data for demonstration
-- Clear existing sample data if any exists
DELETE FROM fee_payments WHERE id IN (
  SELECT fp.id
  FROM fee_payments fp
  JOIN student_fees sf ON fp.student_fee_id = sf.id
  WHERE sf.student_id = '00000000-0000-0000-0000-000000000000'
);

DELETE FROM student_fees WHERE student_id = '00000000-0000-0000-0000-000000000000';

-- Use a placeholder user ID for demonstration
-- In a real app, this would be the actual authenticated user ID
INSERT INTO student_fees (student_id, structure_id, total_amount, paid_amount, due_date)
SELECT
  '00000000-0000-0000-0000-000000000000',  -- Replace with actual user ID in production
  (SELECT id FROM fee_structures WHERE category_id = (SELECT id FROM fee_categories WHERE name = 'Tuition Fees') LIMIT 1),
  50000,
  30000,
  '2025-05-31'
WHERE EXISTS (SELECT 1 FROM fee_structures LIMIT 1);

-- Insert sample payment records
INSERT INTO fee_payments (
  student_fee_id,
  amount,
  payment_method,
  payment_status,
  receipt_url,
  payment_date
)
SELECT
  (SELECT id FROM student_fees WHERE student_id = '00000000-0000-0000-0000-000000000000' LIMIT 1),
  15000,
  'upi',
  'completed',
  'https://example.com/receipt1.pdf',
  '2025-03-15'
WHERE EXISTS (SELECT 1 FROM student_fees WHERE student_id = '00000000-0000-0000-0000-000000000000');

INSERT INTO fee_payments (
  student_fee_id,
  amount,
  payment_method,
  payment_status,
  receipt_url,
  payment_date
)
SELECT
  (SELECT id FROM student_fees WHERE student_id = '00000000-0000-0000-0000-000000000000' LIMIT 1),
  15000,
  'card',
  'completed',
  'https://example.com/receipt2.pdf',
  '2025-04-01'
WHERE EXISTS (SELECT 1 FROM student_fees WHERE student_id = '00000000-0000-0000-0000-000000000000');
