# Movie Streaming Backend System

A comprehensive backend system for a movie streaming service built with **Node.js**, **Express.js**, and **MySQL**, integrated with **SendGrid** for email functionality. This system supports authentication, subscription management, invoice generation, movie catalog management, and payment processing. Designed to provide seamless access to movies and content on a subscription basis, it ensures secure and efficient management of users and media.

## 🚀 Features

### 1. 🔐 Authentication
- **User Registration:** Register via email/password.
- **Login:** Login with email/password or through Google/Facebook OAuth.
- **Session Management:** Utilizes `express-session` with `session-file-store` for session handling.
- **JWT Authentication:** Secure token-based authentication for protected APIs.

### 2. 👥 Role-Based Access Control (RBAC)
- **Role Management:** Admins can create and manage user roles (e.g., Admin, User).
- **Role Assignment:** Assign specific roles to control access to different resources.

### 3. 🎬 Movie Catalog Management
- **List Movies:** View all available movies in the system.
- **Manage Movies:** Add, edit, or delete movie details (titles, genres, descriptions).
- **Top Images:** Manage featured movie images for promotions.

### 4. 📊 Subscription Management
- **Manage Subscriptions:** Admins handle user subscription plans.
- **View Subscription Status:** Users can check and upgrade their subscription plans.

### 5. 🧾 Invoice Management
- **Generate Invoices:** Admins can create and manage invoices for subscriptions.
- **Email Invoices:** Send invoices via SendGrid after successful transactions.

### 6. 💸 Discount Management
- **Manage Discounts:** Create, edit, and delete discount offers for subscriptions or movies.

### 7. 👤 Profile Management
- **View & Edit Profile:** Users can update personal information and subscription plans.
- **Change Password:** Secure password management and update options.

### 8. 💳 Payment Integration
- **Process Payments:** Secure payment handling for subscriptions and purchases.
- **Generate Invoices:** Automatic invoice generation post-payment.

### 9. 🌐 RESTful API Endpoints
- Provides well-documented RESTful APIs for frontend and third-party integrations.

### 10. 📧 SendGrid Integration
- **Email Notifications:** Subscription invoices, account updates, and notifications via SendGrid.

---

## ⚙️ Prerequisites
Ensure the following are installed:
- **[Node.js](https://nodejs.org/)** (v14+ recommended)
- **[MySQL](https://www.mysql.com/)** for database management

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DhruvGajera9022/Movie-Streaming-Backend.git
   cd Movie-Streaming-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file and add the necessary environment variables (DB credentials, SendGrid API key, etc.).

4. **Database Migration:**
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Run the server:**
   ```bash
   npm start
   ```

6. **Access API Documentation (Swagger):**
   ```
   http://localhost:3000/api-docs
   ```

---

## 📋 API Documentation

### Authentication Endpoints
- `POST /api/login` - Login via email/password
- `POST /api/register` - Register new users

### Profile & Address Endpoints
- `GET /api/me` - View user details
- `PUT /api/editProfile` - Edit user profile
- `PUT /api/changePassword` - Change user password
- `GET /api/address` - Get user addresses
- `PUT /api/address` - Edit user address
- `DELETE /api/delete/address/:id` - Delete user address

### Movie & Category Endpoints
- `GET /api/home` - Fetch all categories and movies
- `GET /api/topImages` - Fetch featured movies

### Subscription Endpoints
- `GET /api/subscriptions` - View all subscription plans

### Discount Management
- `GET /api/discount` - View all discount offers

### Invoice Management
- `GET /api/invoices` - Retrieve invoices
- `POST /api/invoices` - Generate a new invoice

### Payment Endpoints
- `POST /api/checkout` - Process payments

---

## 📨 SendGrid Setup
1. **Create a SendGrid account:** [https://sendgrid.com/](https://sendgrid.com/)
2. **Generate API Key:** Add the key to your `.env` file.
3. **Integration:** The system automatically handles email notifications for transactions and updates.

## 📦 Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT, OAuth (Google/Facebook), express-session
- **Email:** SendGrid
- **API Documentation:** Swagger

---

### 📧 Contact
For questions or support, please reach out via [dhruvgajera05@example.com](mailto:dhruvgajera05@example.com).

---

**Happy Streaming! 🎥🍿**

