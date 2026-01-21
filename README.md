Order & Inventory Management System (OMS)
📌 Overview

This project is a backend-first Order & Inventory Management System designed to handle real-world business logic such as stock integrity, order lifecycle management, and role-based access control.

The focus of this project is correctness, consistency, and explainability, not just feature count.

🎯 Core Features
👤 User

View available products

Place orders with quantity validation

View own orders

Cancel orders before shipping

Authentication using JWT

🛠️ Admin

Create products with image upload (Cloudinary)

View all orders

Manage order lifecycle:

PLACED → CONFIRMED → SHIPPED → DELIVERED


Role-based access control

🧠 Key Business Rules

Product stock never goes below zero

Stock is reduced atomically when an order is placed

Stock is restored if an order is cancelled

Users can cancel orders only before shipping

Admins control order status transitions

Invalid order state transitions are blocked

These rules are enforced on the backend, not the frontend.

🏗️ Tech Stack
Backend

Node.js

Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

Cloudinary (image uploads)

Frontend

React

TypeScript

Tailwind CSS

Axios


Business logic is kept in services, controllers remain thin.

🚀 How to Run Locally

Backend

cd server

npm install

npm run dev


Create a .env file 

Frontend

cd client

npm install

npm run dev

🔐 Environment Variables

Create .env in the server directory:

PORT=8080

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

🧪 What This Project Demonstrates

Backend business logic handling

Inventory consistency under concurrent requests

Proper use of MongoDB ObjectId references

Role-based authorization

Clean separation of concerns

Debugging real-world issues (CORS, auth state, populate, schema design)

🔮 Future Improvements

Deployment (Render / Railway + Vercel)

Better auth abstraction

Refresh tokens

Notifications

Admin analytics dashboard
