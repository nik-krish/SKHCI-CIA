## Productivity Dashboard with Chat System

## Overview

This is a comprehensive productivity dashboard with integrated real-time chat functionality, designed to streamline team collaboration and task management.

## Key Features

### 🚀 Productivity Dashboard
- **Task Statistics Overview**: Cards showing total, completed, in-progress, and todo tasks
- **Priority Distribution**: Visual chart of tasks by priority level
- **Recent Activity**: Tables displaying latest tasks and team members

### 💬 Real-Time Chat System
- **Team Channels**: Organized communication spaces
- **Direct Messaging**: Private 1:1 conversations
- **File Sharing**: Upload and share documents
- **Message History**: Persistent chat logs
- **@Mentions**: Notify team members directly

## Technologies Stack

### Frontend
- **React** with **Vite** for fast development
- **Tailwind CSS** for responsive styling
- **Socket.IO** for real-time communication
- **React Icons** for beautiful icons

### Backend
- **Node.js** with **Express**
- **MongoDB** for data persistence
- **Redis** for caching and pub/sub

### Additional Libraries
- **Redux** for state management
- **Recharts** for data visualization
- **Moment.js** for date handling
- **clsx** for conditional class names

## Installation Guide

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (v5+)
- Redis (optional for production)

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskflow-pro.git
   cd taskflow-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   Create `.env` files in both `client` and `server` directories with required variables.

4. Start the development servers:
   ```bash
   # In one terminal (server)
   cd server && npm run dev

   # In another terminal (client)
   cd client && npm run dev
   ```

5. Access the application:
   ```
   http://localhost:3000 (client)
   http://localhost:5000 (server)
   ```

## Chat System Architecture

```
Client (React) ↔ Socket.IO ↔ Server (Node.js/Express)
                     ↑
                     ↓
              Message Broker (Redis)
                     ↑
                     ↓
              Database (MongoDB)
```

### Key Chat Components
1. **Chat Context**: Manages chat state and connections
2. **Socket Service**: Handles real-time communication
3. **Message Store**: Persists chat history
4. **Notification System**: Alerts for new messages

## Configuration

### Client Environment Variables
```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_ENABLE_DARK_MODE=true
```

### Server Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret
SOCKET_CORS_ORIGIN=http://localhost:3000
```

## Usage Guide

### Dashboard Features
1. **Task Management**:
   - Filter tasks by status (To Do, In Progress, Completed)
   - Set priorities (High, Medium, Low)
   - Assign tasks to team members

2. **Team Collaboration**:
   - View team member statuses
   - Check recent activity
   - Manage user roles and permissions

3. **Chat System**:
   - Click the chat icon in the sidebar to open chat
   - Switch between channels and direct messages
   - Use @mentions to notify specific team members
   - Upload files by dragging into the chat window

## Deployment

### Production Build
```bash
# Client
cd client && npm run build

# Server
cd server && npm run build
```


