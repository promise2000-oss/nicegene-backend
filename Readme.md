# Walkthrough - Nicegene Backend Setup Completed

The backend foundation for the Nicegene Website revamp has been successfully built and verified to compile without errors.

---

## What was Built

### 1. Database Schema (`src/models/`)
* **[User.ts](file:///c:/Users/HP/Desktop/back-nice-web/src/models/User.ts)**: Admin users with secure password hashing via `bcryptjs`.
* **[Project.ts](file:///c:/Users/HP/Desktop/back-nice-web/src/models/Project.ts)**: Portfolio projects with tags, category, and links.
* **[Blog.ts](file:///c:/Users/HP/Desktop/back-nice-web/src/models/Blog.ts)**: Blogs/Events structure.
* **[Staff.ts](file:///c:/Users/HP/Desktop/back-nice-web/src/models/Staff.ts)**: Staff directory holding emails and dates of birth for automation.
* **[Graduate.ts](file:///c:/Users/HP/Desktop/back-nice-web/src/models/Graduate.ts)**: Academy graduation records with grades and testimonies.
* **[Contact.ts](file:///c:/Users/HP/Desktop/back-nice-web/src/models/Contact.ts)**: Logs and keeps track of visitor contact queries.

### 2. Controllers & Routes (`src/controllers/`, `src/routes/`)
* Fully realized CRUD APIs for all resources, with authentication and role authorization checks.
* **Auth endpoints**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`.
* **Portfolio endpoints**: CRUD `/api/projects`.
* **Blog endpoints**: CRUD `/api/blogs`.
* **Staff endpoints**: CRUD `/api/staff`.
* **Graduate endpoints**: CRUD `/api/graduates`.
* **Contact endpoints**: POST submission `/api/contact`, GET views `/api/contact`.

### 3. File Upload Middleware (`src/middleware/uploadMiddleware.ts`)
* Configured `multer` to accept images (mimetypes verified) up to 5MB, saving them locally into `uploads/`.

### 4. Birthday Cron Job (`src/cron/birthdayCron.ts`)
* Schedules a daily job using `node-cron` matching `currentMonth` and `currentDay` with staff birthdates directly inside MongoDB via an aggregation-based filter query.
* Sends automated birthday greeting emails.

### 5. Email Service (`src/services/emailService.ts`)
* Connects to local SMTP Nodemailer during development (defaulting to Mailtrap ports) and uses `Resend` SDK in production environments.

### 6. Interactive API Documentation (`src/utils/swagger.ts`)
* Extends Swagger JSDoc and Swagger UI Express, exposing interactive documentation under http://localhost:5000/api-docs.

---

## Seeding & Development Testing

* When you start the server, it automatically connects to MongoDB and seeds a default administrator account:
  * **Email**: `admin@nicegene.com`
  * **Password**: `password123`
* You can login at `/api/auth/login` to obtain your JWT Bearer token and use it to test the restricted POST, PUT, and DELETE endpoints.

---

## How to Run the App

1. Ensure MongoDB is running on your machine or configure your connection string in a `.env` file (`MONGO_URI`).
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Visit the Swagger Documentation panel:
   * **URL**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
