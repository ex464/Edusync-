# EduSync - School Management System

## Project Description
EduSync is a comprehensive School Management System (SMS) designed to streamline and automate various administrative and academic processes in educational institutions. It provides features for managing students, teachers, attendance, exams, fees, finance, calendar events, activities, feedback, promotions, reports, resources, and more through an intuitive web interface.

## Technologies Used

### Backend
- Node.js with TypeScript
- Express.js
- PostgreSQL (pg)
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variable management
- CORS for cross-origin resource sharing

### Frontend
- React with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- shadcn-ui and Radix UI components for UI elements
- React Router for routing
- React Query for data fetching and caching
- Supabase client for backend integration
- Various utility libraries like date-fns, clsx, zod, and more

## Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- PostgreSQL database

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and configure your environment variables (e.g., database connection string, JWT secret).
4. Initialize the database using the SQL script located at `backend/db/init.sql`.
5. Start the backend server in development mode:
   ```bash
   npm run dev
   ```
   Or build and start the production server:
   ```bash
   npm run build
   npm start
   ```

### Frontend Setup
1. From the root project directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure Overview

- `backend/`: Contains the backend Node.js Express application
  - `src/`: Source code including routes, controllers, services, middleware, and database setup
  - `db/`: Database initialization scripts
- `src/`: Frontend React application source code
  - `components/`: Reusable UI components organized by feature
  - `pages/`: React pages for different views
  - `context/`, `hooks/`, `lib/`: Supporting utilities and state management
- `public/`: Static assets like favicon and robots.txt
- Configuration files for TypeScript, Vite, Tailwind CSS, ESLint, etc.

## Features Overview

- User authentication and authorization
- Student management including profiles and documents
- Teacher management
- Attendance tracking and reporting
- Exam scheduling and results management
- Fee management and payment history
- Financial summaries and budget management
- Calendar and event management
- Activity and promotion management
- Feedback system for users
- Notifications and alerts
- Study resources and topic management
- Dashboard with charts and recent activities
- Multi-language support and theme customization

## Environment Variables

The backend uses environment variables configured in a `.env` file. Typical variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing
- Other variables as needed for configuration

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Additional Information

### Recommended Node.js and npm Versions
- Node.js v16 or higher
- npm v8 or higher

### Building for Production

#### Backend
To build the backend for production, run:
```bash
cd backend
npm run build
```
This compiles the TypeScript code into JavaScript in the `dist` folder.

#### Frontend
To build the frontend for production, run:
```bash
npm run build
```
This creates an optimized build in the `dist` folder.

### Environment Variables Configuration

Create a `.env` file in the `backend` directory with the following variables:
```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
# Add other environment variables as needed
```

### Database Initialization

Run the SQL script located at `backend/db/init.sql` to set up the initial database schema and seed data.

### Running Tests

Currently, there are no automated tests configured. Contributions to add tests are welcome.

### Code Style and Linting

- ESLint is configured for linting the frontend code.
- Run `npm run lint` to check for linting errors.

### Troubleshooting

- Ensure PostgreSQL is running and accessible via the connection string.
- Check that environment variables are correctly set.
- For backend issues, check the console logs for error messages.

### Contact and Support

# Add other environment variables as needed
Create a `.env` file in the `backend` directory with the following variables:
