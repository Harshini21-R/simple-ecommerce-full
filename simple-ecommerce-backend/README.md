# Simple E-commerce Backend

## Setup

1. Copy `.env.example` to `.env` and fill `MONGO_URI` and `TOKEN_SECRET`.
2. Install dependencies:
   ```
   npm install
   ```
3. Start server:
   ```
   npm run dev
   ```
4. Open `http://localhost:5000` to view the simple product page.

## Notes
- Use Postman to signup/login (`/api/auth/signup`, `/api/auth/login`) to receive a JWT token.
- For admin actions (add/update/delete products), create a user and manually set role to `admin` in the database or use MongoDB Atlas UI.
