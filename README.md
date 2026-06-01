# Counselor-Student Action Center

A lightweight full-stack dashboard designed for educational counselors to monitor student progress, manage tasks, track unread messages, and identify urgent situations. Built using **React, TypeScript, Vite** on the frontend and **Node.js, Express, TypeScript** on the backend.

---

## 🏗️ Architecture Note

The project follows a clean separation of concerns and maintains type safety across the frontend and backend.

### Backend Structure

The backend is organized using a layered architecture:

* **Routes (`/routes`)**

  * Defines API endpoints and maps requests to controllers.

* **Controllers (`/controllers`)**

  * Handles HTTP requests and responses.
  * Performs request validation and delegates logic to services.

* **Services (`/services`)**

  * Contains business logic.
  * Handles task status updates and urgency calculations.

* **Data (`/data`)**

  * Stores mock student, task, and message data.
  * Simulates a database using TypeScript models.

* **Middleware (`/middleware`)**

  * Centralized error handling and request processing.

### Frontend Structure

* **Pages & Components**

  * Reusable UI components for student profiles, tasks, messages, and summary cards.

* **Custom Hooks**

  * Encapsulates data fetching and state management.
  * Keeps UI components focused on rendering.

### Data Flow

1. User selects a student.
2. Frontend requests student action center data.
3. Backend returns student profile, tasks, messages, and summary information.
4. User updates task status.
5. Frontend sends a PATCH request.
6. Backend updates the task and returns the updated data.

---

## 📝 API Contract

### 1. Get All Students

**Endpoint**

```http
GET /api/students
```

**Response**

```json
[
  {
    "id": "student_1",
    "name": "Jane Doe"
  }
]
```

---

### 2. Get Student Action Center

**Endpoint**

```http
GET /api/students/:id/action-center
```

**Response**

```json
{
  "student": {
    "id": "student_1",
    "name": "Jane Doe"
  },
  "tasks": [
    {
      "id": "task_1",
      "studentId": "student_1",
      "title": "Submit Statement of Purpose",
      "status": "todo",
      "priority": "high",
      "updatedAt": "2026-06-01T12:00:00.000Z"
    }
  ],
  "messages": [
    {
      "id": "msg_1",
      "studentId": "student_1",
      "content": "Hello Counselor, please review my documents.",
      "read": false
    }
  ],
  "summary": {
    "totalTasks": 1,
    "completedTasks": 0,
    "unreadMessages": 1,
    "urgencyLevel": "high"
  }
}
```

---

### 3. Update Task Status

**Endpoint**

```http
PATCH /api/tasks/:taskId/status
```

**Request Body**

```json
{
  "status": "completed"
}
```

**Response**

```json
{
  "id": "task_1",
  "studentId": "student_1",
  "title": "Submit Statement of Purpose",
  "status": "completed",
  "priority": "high",
  "updatedAt": "2026-06-01T23:38:00.000Z"
}
```

---

## 🚀 Setup & Run Instructions

### Prerequisites

* Node.js 18+
* npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/suryaKumar2408/counselor-student-action-center.git
cd counselor-student-action-center
```

---

### 2. Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal and run:

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## ✨ Features

* Student profile summary
* Task management dashboard
* Unread message tracking
* Dynamic urgency indicators
* Task status updates
* Student switching
* Responsive UI
* Type-safe API integration

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript

---

## 🌐 Deployment

* Frontend: Vercel
* Backend: Render
