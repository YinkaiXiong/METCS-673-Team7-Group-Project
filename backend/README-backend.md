# WatchDog API

## Overview

WatchDog is a comprehensive server monitoring and management system designed to oversee multiple servers' health, performance, and functionality. It provides a centralized platform for administrators to monitor critical server metrics, manage user accounts, and perform various administrative tasks efficiently.

### New Functionalities
## Features
- **User Authentication**: Authenticates users using email and password, generating authentication tokens for successful logins.
- **User Management**:
    - **Login**: Authenticates users based on email and password credentials.
    - **New User Request**: Processes new user registration requests, creating temporary users and sending verification emails for account confirmation.
    - **Create User**: Creates a new user after verifying the registration token, assigning roles, and storing hashed passwords securely.
    - **Update Password**: Allows users to update their passwords securely, validating the old password.
    - **Forget Password**: Handles the functionality for users to reset their passwords, sending reset password instructions via email.
    - **Delete User**: Deletes a user based on their email from the system.
    - **Update User Role**: Updates user roles based on email and a new role provided.
    - **Get All Users**: Retrieves all users' details except passwords.
- **Role Management**:
    - **Get All Roles**: Retrieves a list of all available roles.
    - **Find Role**: Finds a role based on its name.
- **Email Services Integration**: Integrates email functionality for user verification, password reset, and sending notifications.
- **Password Encryption**: Ensures password security by encrypting passwords before storing them in the database.
- - **Server Management**:
    - **Add New Server**: Adds a new server to the system, storing server credentials securely and executing SSH commands to set up server monitoring scripts.
      - Uses SSH2 to establish a connection and transfer monitoring scripts to the server.
      - Sets up cron jobs for script execution at defined intervals.
      - Validates the operating system before adding the server.
    - **Delete Server**: Deletes a server from the system, including removing associated monitoring scripts and scheduled tasks.
      - Removes cron jobs and associated monitoring scripts.
      - Deletes the server details from the database.
    - **Update Server Password**: Allows users to update server passwords, validating old credentials and updating them securely.
    - **Retrieve Server Data**: Retrieves server data based on hostname, collecting and organizing server metrics like CPU usage, memory, disk space, etc.
- **Operating System Management**: Stores information about various operating systems.


## Technology Stack

- **Backend:** Node.js with Express.js for RESTful APIs.
- **Database:** MongoDB for storing server configurations, user details, and system logs.
- **Authentication:** JWT for secure authentication and authorization.
- **Server Monitoring:** Utilizes SSH2 for remote server access and monitoring.
- **Frontend (if applicable):** HTML, CSS, JavaScript, React for a user-friendly interface.
- 
## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables as per the provided `.env.example`.
4. Ensure MongoDB is running and configure connection details in the environment variables.
5. Run the application using `npm start`.

## Environment Variables

Create a `.env` file in the root directory of the project. Add the following environment variables to it:

```plaintext
MONGODB_URL="your_mongodb_url_here"
JWT_SECRET=your_secret_here
JWT_EXPIRE=30
JWT_COOKIE_EXPIRE=30
SECRET=your_secret_here
IV=your_initialization_vector_here
FILE_PATH=/path/to/your/file.py
LOCAL_PATH=/path/to/your/local/file.py
```


### User APIs

#### `/login`
- **Method:** `GET`
- **Description:** Authenticates a user using email and password.
- **Controller Method:** `userController.login`

#### `/createUser/:token/:email`
- **Method:** `POST`
- **Description:** Processes a new user registration request.
- **Controller Method:** `userController.createUser`

#### `/getAllUsers`
- **Method:** `GET`
- **Description:** Retrieves details of all users.
- **Controller Method:** `userController.getAllUsers`

#### `/deleteUser`
- **Method:** `DELETE`
- **Description:** Deletes a user based on specific criteria.
- **Controller Method:** `userController.deleteUser`

#### `/getUser`
- **Method:** `POST`
- **Description:** Finds a user based on email.
- **Controller Method:** `userController.findUser`

#### `/getAllRoles`
- **Method:** `GET`
- **Description:** Retrieves details of all roles.
- **Controller Method:** `userController.getAllRoles`

#### `/updateUserRole`
- **Method:** `PATCH`
- **Description:** Updates user role based on email and new role.
- **Controller Method:** `userController.updateUserRole`

#### `/resetpassword/:resettoken`
- **Method:** `PATCH`
- **Description:** Resets the password for a user based on the reset token and new password.
- **Controller Method:** `userController.resetPassword`

#### `/newUserRequest`
- **Method:** `POST`
- **Description:** Processes a new user registration request.
- **Controller Method:** `userController.newUserRequest`

#### `/forgotPassword`
- **Method:** `PATCH`
- **Description:** Handles the reset password functionality for a user.
- **Controller Method:** `userController.forgotPassword`

#### `/updatePassword`
- **Method:** `PATCH`
- **Description:** Updates the user's password after verifying the old password.
- **Controller Method:** `userController.updatePassword`

### Server APIs

#### `/getAllServers`
- **Method:** `GET`
- **Description:** Retrieves details of all servers.
- **Controller Method:** `serverController.getAllServers`

#### `/updateServer`
- **Method:** `PATCH`
- **Description:** Updates server details based on specific criteria.
- **Controller Method:** `serverController.updateServer`

#### `/addServer`
- **Method:** `POST`
- **Description:** Adds a new server.
- **Controller Method:** `serverController.addServer`

#### `/deleteServer`
- **Method:** `DELETE`
- **Description:** Deletes a server based on specific criteria.
- **Controller Method:** `serverController.deleteServer`

#### `/getServerData`
- **Method:** `GET`
- **Description:** Retrieves server data based on hostname.
- **Controller Method:** `serverController.getServerData`


### Server Monitoring Python Script
The Python script monitors server vitals such as CPU usage, memory usage, disk space, and active network connections. It stores this information in a MongoDB database.

#### Libraries Used
- `psutil`: Retrieves system information like CPU, memory, disk usage, etc.
- `pymongo`: Connects to MongoDB and stores server vitals.

#### Script Overview
The script performs the following tasks:
1. Establishes a connection to a MongoDB database.
2. Retrieves server vitals like CPU usage, memory details, disk space, and active network connections using `psutil`.
3. Gathers server hostname and public IP address using AWS EC2 metadata.
4. Stores the collected server vitals and metadata in a MongoDB collection.

#### MongoDB Configuration
- **Host:** `servermonitor.cwqmodg.mongodb.net`
- **Database Name:** `server_monitor`
- **Collection Name:** `server_data`



## Usage

1. Register a user with required credentials.
2. Log in using registered credentials to access the system.
3. Manage users, roles, servers, etc., via the exposed API endpoints or functionalities.

## Models and Schemas

- **User**: Handles user-related data, authentication, and authorization.
- **Role**: Defines user roles and their associated components.
- **Operating System**: Stores details about various operating systems.
- **Server**: Manages server information, including secure password storage.

## Purpose

WatchDog aims to streamline server management, ensuring reliability, security, and performance optimization. It caters to system administrators, providing an intuitive interface to monitor, manage, and maintain multiple servers effortlessly, contributing to a stable and efficient IT infrastructure.


## Target Audience

System administrators, DevOps engineers, and IT professionals responsible for managing multiple servers in an organization or data center will benefit from WatchDog's centralized monitoring and management capabilities.


