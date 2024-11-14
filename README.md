# Node.js Application with MySQL and Authentication

This is a Node.js application using Express.js, Passport.js for authentication (Google and Facebook), and MySQL as the database. It supports registration, login, CRUD operations, and includes JWT-based APIs for various resources.

# Application Functionality Overview

This section details the core functionality provided by each module in the application.

## 1. Authentication

The authentication system supports:

- **Registration**: Allows new users to sign up via the registration page or API endpoint.
- **Login**: Users can log in with their email/password or through Google/Facebook OAuth.
- **Social Authentication**: Users can authenticate via Google or Facebook.
- **Session Management**: Sessions are managed using `express-session` with session persistence via `session-file-store`.
- **JWT Tokens**: Some routes and APIs are protected by JWT middleware, providing token-based authentication for secure access.

## 2. User Management

This module is designed to allow admins to manage user accounts:

- **View Users**: Admins can view a list of all registered users.
- **Add/Edit User**: Admins can add or edit user details.
- **Delete User**: Admins can delete user accounts.

## 3. Role-Based Access Control (RBAC)

Implemented to restrict or allow access based on user roles:

- **Role Management**: Admins can create, edit, and delete roles.
- **Role Assignment**: Roles are assigned to users, granting access to specific parts of the application.

## 4. Category Management

Allows admins to manage product categories:

- **List Categories**: View all categories.
- **Add/Edit Category**: Add new categories or update existing ones.
- **Delete Category**: Remove categories from the system.

## 5. Product Management

Product module enables admins to manage the product catalog:

- **List Products**: View all available products.
- **Add/Edit Product**: Add new products or update details of existing ones.
- **Delete Product**: Remove products from the catalog.
- **Image Upload**: Allows image uploads for product visualization.

## 6. Discount Management

Discounts can be managed by admins for promotions:

- **View Discounts**: List all available discounts.
- **Add/Edit Discount**: Create new discounts or edit existing ones.
- **Delete Discount**: Remove discounts.
- **Image Upload**: Allows upload of images associated with discounts.

## 7. Profile Management

Users can view and edit their profile information:

- **View Profile**: Display user’s profile data.
- **Edit Profile**: Update user information and upload profile images.
- **Address Management**: Users can add, edit, or delete addresses associated with their profile.

## 8. Dashboard

Main landing page for logged-in users, showing key information and navigation:

- **Dashboard Data**: Displays basic user information and relevant data.

## 9. Invoice Management

Admin-managed module for invoice generation and tracking:

- **View Invoices**: List of all invoices generated.
- **Generate Invoice**: Generate invoices for transactions.

## 10. Settings Management

Allows admins to manage general application settings:

- **View Settings**: Retrieve application settings.
- **Edit Settings**: Update global settings for the application.

## 11. Payment Integration

Handles user payments and generates invoices for completed transactions:

- **Checkout**: Process payments for purchases.
- **Generate Invoice**: Create and store an invoice upon successful payment.

## 12. APIs

RESTful APIs available for integration with other services or frontend applications:

- **Authentication APIs**:
  - `/api/login`: Login via API.
  - `/api/register`: Registration via API.
- **Data APIs**:
  - `/api/category`: Retrieve all categories.
  - `/api/products`: Retrieve all products.
  - `/api/address`: Get user address (JWT required).
  - `/api/settings`: Retrieve application settings.
  - `/api/discount`: Retrieve discounts.
  - `/api/me`: Retrieve logged-in user details (JWT required).
- **Address APIs**:
  - **POST** `/api/address`: Add or update user address.
  - **DELETE** `/api/delete/address/:id`: Delete an address.

This functionality overview provides a detailed look at what each module offers and how it is structured to support the application's features.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MySQL](https://www.mysql.com/) for database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DhruvGajera9022/Node-Project.git
   cd Node-Project
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
