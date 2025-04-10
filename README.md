# Dynamic Family Information System

A comprehensive full-stack web application designed for collecting and managing detailed family information. This system features an intuitive dynamic form interface that enables users to easily input and update information for multiple family members.

## Core Features

- Smart dynamic form generation that adapts based on the number of family members
- Sleek, responsive interface built with Tailwind CSS
- Comprehensive real-time form validation
- Robust backend API powered by FastAPI
- Reliable data persistence using MongoDB

## Technology Stack

- Frontend: React with Tailwind CSS for styling
- Backend: FastAPI framework for Python
- Database: MongoDB document storage

## Project Structure

```
/
├── frontend/           # React application
│   ├── public/         # Static assets and resources
│   └── src/            # React source code and components
├── backend/            # FastAPI application
│   ├── app/            # API endpoints and business logic
│   └── database/       # Database models and connection handlers
└── README.md           # Project documentation and setup guide
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager
- MongoDB (running locally or an accessible remote instance)

### Environment Variables

#### Frontend (.env)

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_URL=http://localhost:8000

# Application Settings
VITE_APP_TITLE="Family Information System"
VITE_APP_DESCRIPTION="An advanced system for collecting family information"
```

#### Backend (.env)

Copy `.env.example` to `.env` and configure:

```bash
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=family_information_system

# FastAPI Configuration
BACKEND_CORS_ORIGINS=["http://localhost:5173"]
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend interface will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## API Documentation

### Endpoints

#### POST /api/family-members

Submits comprehensive family member information.

**Request Body:**

```json
{
  "familyMembers": [
    {
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "string",
      "relationship": "string",
      "native_city": "string",
      "native_state": "string",
      "occupation": "string",
      "contact_information": {
        "email": "string",
        "phone": "string"
      }
    }
  ]
}
```

**Response:**

- `200 OK`: Successfully saved family members
- `400 Bad Request`: Invalid input data
- `500 Internal Server Error`: Server error

## Development

- Frontend code and components are located in `frontend/src/`
- Backend API endpoints are defined in `backend/app/main.py`
- Database models and schemas are in `backend/app/models.py`

## Deployment

### Frontend Deployment

1. Build the frontend for production:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the contents of the `dist/` directory to your preferred hosting service

### Backend Deployment

1. Set up your production database with proper security configurations
2. Configure environment variables for your production environment
3. Deploy using your preferred hosting service or container orchestration

Recommended hosting platforms:

- Frontend: Vercel, Netlify, or AWS S3 with CloudFront
- Backend: Docker containers on AWS ECS, GCP Cloud Run, or Azure Container Instances
