# Node.js To-Do Application

This is a backend application for a To-Do list, built with Node.js and MongoDB. It supports user authentication, and allows users to create, manage, and organize tasks within projects.

## Features

- **User Authentication**: Includes endpoints for user registration, login, and logout.
- **Project Management**: Users can create, update, and delete projects.
- **Task Management**: Users can add, update, and delete tasks within specific projects.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and MongoDB installed on your local system to run this project.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Justin-Gabriel/TODO-BACKEND
    ```

2. **Navigate to the project directory:**

    ```bash
    cd TODO-BACKEND
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root directory and fill it with the necessary values as shown in `.env.example`.

    ```
    MONGODB_URI=mongodb://localhost:27017/todoapp
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

### API Endpoints

#### Auth Endpoints

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Login a user.

#### Project Endpoints

- **POST /project/create-project**: Create a new project.
- **GET /project/get-projects**: List all projects.
- **GET /project/summary/:projectId**: Create a markdown file for the summary.
- **GET /project//:projectId?**: Give the projectDetails such as all tha tasks under it
- **PUT /project/edit-project**: Update a project.
- **DELETE /project/delete-project/:projectId**: Delete a project.

#### Task Endpoints

- **POST /task/create-task**: Add a new task to a project.
- **GET /task/get-tasks**: Get all tasks in a project.
- **PUT /task/edit-task**: Update a task.
- **PUT /task/change-status/:taskId**: Update the status of the task. 
- **DELETE /tasks/delete-task/:taskId**: Delete a task.

## Built With

- **Node.js**
- **Express** - The web framework used
- **MongoDB** - The database used
- **Mongoose** - MongoDB object modeling tool
- **JWT** - Used for generating JSON Web Tokens for authentication

