# Movie Streaming Backend System

A comprehensive backend system for a movie streaming service built with Node.js, Express.js, MySQL, and integrated with SendGrid for email functionality. The system supports authentication, subscription management, invoice generation, movie catalog management, and payment processing, designed to provide users with access to movies and content on a subscription basis.

## Features

## 1. Authentication

- **User Registration**: Allows users to register via email/password.
- **Login**: Users can log in with email/password or through Google/Facebook OAuth.
- **Session Management**: Uses express-session and stores sessions using session-file-store.
- **JWT Authentication**: Token-based authentication for certain APIs.

## 2. Role-Based Access Control (RBAC)

- **Role Management**: Admins can manage user roles (e.g., Admin, User, etc.).
- **Role Assignment**: Users are assigned roles to access specific resources.

## 3. Movie Catalog Management

- **List Movies**: Admins can view and list all available movies in the system.
- **Add/Edit/Delete Movies**: Admins can manage movie details including titles, genres, and descriptions.
- **Top Images**: Admins can manage the top images to be displayed for featured movies.

## 4. Subscription Management

- **Manage Subscriptions**: Admins can manage subscription plans for users, allowing users to access movies based on their subscription.
- **View Subscription Status**: Users can check their subscription status and upgrade if necessary.

## 5 . Invoice Management

- **View and Generate Invoices**: Admins can generate and manage invoices for user subscriptions and payments.
- **Email Invoices**: Invoices can be emailed to users upon successful transactions via SendGrid integration.

## 6. Discount Management

- **Manage Discounts**: Admins can create, edit, and delete discount offers for subscriptions or movies.

## 7. Profile Management

- **View Profile**: Users can view and edit their profile, including their email and subscription plan.
- **Change Password**: Users can change their passwords.

## 8. Payment Integration

- **Process Payments**: Handles the payment processing for subscription services and movie purchases.
- **Generate Invoice**: After a successful payment, an invoice is generated for the user.

## 9. API Endpoints

- Provides RESTful API endpoints for external integrations and frontend applications.

## 10. SendGrid Integration

- **Email Notifications**: SendGrid is used for sending emails like subscription invoices, account updates, and other notifications.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MySQL](https://www.mysql.com/) for database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DhruvGajera9022/Movie-Streaming-Backend.git
   cd Movie-Streaming-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables.

4. For create Database in MySql:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Run the Server:

   ```bash
   npm start
   ```

6. Access Swagger Documentation:
   ```bash
   http://localhost:3000/api-docs
   ```

## API Documentation

- **Authentication Endpoints**:
  - `/api/login` - Login via email/password
  - `/api/register` - Register new users
- **Profile & Address Endpoints**:
  - `/api/me`: View user's all details
  - `/api/editProfile`: Edit user's profile
  - `/api/changePassword`: Edit user's password
  - `/api/address`: Get user's addresses
  - `/api/address`: Edit user's address
  - `/api/delete/address/:id`: Delete user's address
- **Movie & Category Endpoints**:
  - `/api/home`: Get all categories and movies
  - `/api/topImages`: Get all top movies details
- **Subscription Endpoints**:
  - `/api/subscriptions`: Get all subscriptions
- **Discount Management**:
  - `/api/discount`: Get all discounts
- **Invoice Management**:
  - `/api/invoices`: Get all invoices
  - `/api/invoices`: Generate new invoice
- **Payment Endpoints**:
  - `/api/checkout`: Process a payment
