# EduPortal Backend

This is the backend for the EduPortal application, built with Node.js, Express, and MongoDB (via Mongoose).

## Features

- User authentication (bcryptjs, jsonwebtoken)
- Course management
- API routes for users and courses

## Technologies Used

- Node.js
- Express.js
- Mongoose (for MongoDB interaction)
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT authentication)
- body-parser (for parsing request bodies)
- cors (for Cross-Origin Resource Sharing)
- morgan (for HTTP request logging)
- multer (for handling multipart/form-data)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd eduportal
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the root directory and add your MongoDB connection string, JWT secret, and any other necessary environment variables. For example:

    ```
    MONGO_URI=mongodb://localhost:27017/eduportal
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the application:**

    -   **Development Mode (with nodemon for auto-restarts):**

        ```bash
        npm run dev
        ```

    -   **Production Mode:**

        ```bash
        npm start
        ```

    The server will typically run on `http://localhost:3000` (or another port if configured).

## Project Structure

-   `models/`: Defines Mongoose schemas for `Course` and `User`.
-   `routes/api/`: Contains API routes for `courses` and `users`.
-   `server/index.js`: The main entry point for the Express application.

## API Endpoints (Examples)

-   `POST /api/users/register`
-   `POST /api/users/login`
-   `GET /api/courses`
-   `POST /api/courses`

(Further details on API endpoints can be found by examining the `routes` directory.)