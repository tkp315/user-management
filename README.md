# Project Overview

This is an User Management System built using React that integrates with the Reqres API to manage user data. The application includes essential features like user authentication, user list display, editing and deleting user information, and additional functionalities such as search, pagination, and view toggling.

# Access Deployed URL
```
https://user-management-two-pi.vercel.app
```

# API Base URL
```
VITE_BASE_URL = https://reqres.in/api
```
# Installation and Setup

1. Clone the Repository
```
git clone https://github.com/tkp315/user-management
```
2. Install Dependencies
```
npm install
```
3. Environment Setup
 - Create a `.env` file in the root directory

 - Add the following line:
 
 ```
 VITE_BASE_URL=https://reqres.in/api
 ```
4. Run the Application
   ```
   npm run dev
   ```
5. Access the Application
 ```
 http://localhost:5173
 ```

 # Tech Stack and Libraries

 - React 
 - Tailwind css 
 - ShadCN UI (Component Library)
 - ShadCN + tanstack table (table view)
 - Redux Toolkit (State Management)
 - React Router DOM (Navigation )
 - Zod (form validations)
 - React-Form-Hook (Forms)

# Features Implemented

1. Authentication Screen
- Basic login screen with credentials validation.
- Storing Token in `sessionStorage`

2. List All Users
- Display users in a paginated table view.
- Shown user details 
- Search users from `first_name`
- View toggle 

3. Edit User
- Opens a pre-filled form 
- Change `first_name`,`last_name`, and `email` 
- Applied validations also

4. Delete User 
- Removes user from list

5. View Toggle
- Allows users to dynamically show or hide columns in the table
6. Pagination
- Pagination with page navigation

