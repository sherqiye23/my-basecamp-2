# Welcome to My Basecamp 2

## Task
The objective of this project is to build the first stage of a web-based project management tool, mimicking the core features of the original Basecamp launched in 2004.

**The Problem:** Develop a full-stack web application that allows users to create accounts, log in, manage their sessions, and create/manage projects through essential CRUD operations.

**Key Technical Challenges:**
1.  **Full Authentication and Session Management:** Implementing secure user registration, login, logout, and persistent session management.
2.  **Role-Based Authorization:** Establishing and enforcing two permission levels (`user` and `admin`) with the ability to dynamically manage (set/remove) administrative roles.
3.  **Ownership Verification:** Ensuring that only the user who created a project (or an admin) can modify or delete it.

## Description
This solution is implemented as a Full-Stack Web Application using the Node.js ecosystem, specifically utilizing the **Express.js** framework for the backend, **Sequelize ORM** with an **SQLite** database, and **EJS** as the templating engine for server-side rendering.

**Technology Stack:**
* **Backend:** Node.js, Express.js
* **Database:** SQLite (File-based database)
* **ORM:** Sequelize
* **View Engine (Frontend):** EJS (Embedded JavaScript)
* **Security:** `bcryptjs` for password hashing, `express-session` for stateful session management.

**Implemented Features (MyBaseCamp 1 Requirements):**
* **User Registration & Profile:** `User #create`, `User #show` (basic profile logic).
* **Session Management:** `User #sign_in` and `User #sign_out`.
* **Project Management:** Full CRUD operations (`Project #new`, `Project #show`, `Project #edit`, `Project #destroy`).
* **Role Permission:** The `User` model includes a `role` field (`user`/`admin`). Logic for `User setAdmin` and `User removeAdmin` is structured within the routes, protected by an Admin middleware.

## Installation
To set up and run this project on your local machine, follow the steps below.

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (Version 18 or newer recommended)
* npm (Node Package Manager)

### 2. Install Dependencies
Navigate to the project's root directory (`MY_BASECAMP_1/`) and run the following command to install all necessary packages defined in `package.json`:
npm install

### 3. Database Initialization
The project uses SQLite and Sequelize. When server.js is run for the first time, Sequelize automatically connects to and creates the database.sqlite file, initializing the Users and Projects tables based on the models defined in the models/ directory.

## Usage
Once the dependencies are installed, use the following command to start the application server.

1. Starting the Server
Run the application from the project root:

Bash

npm start
For development purposes with automatic restart on file changes, use npm run dev (requires nodemon dev dependency).

2. Accessing the Application
The server will start listening on the configured port (default is Port 3000). Access the application via your web browser:

http://localhost:3000
Application Flow
1. Register: Create a new user account via the /register page.
2. Login: Sign in using your credentials on the /login page.
3. Dashboard: Upon successful login, you are redirected to the project dashboard (/projects/dashboard).
4. Create Project: Use the "New Project" link to define and create a new project.
5. Manage: Only the user who created a project (or an Admin) will see the 'Edit' and 'Delete' options on the project's detail page.

### The Core Team
guliyev_r

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
