# Appointment Booking System

A full-stack clinic appointment booking system..
The system allows users to create doctors and patients, book appointments, cancel appointments, and view available time slots based on doctor schedules. It also includes overlap prevention, validation, logging, Swagger API documentation, tests, seed data, Docker support, and a React frontend.

## Goal of the project

The goal of this project is to demonstrate clean project structure, backend/frontend integration, appointment time logic, overlap handling, API documentation, testing, and basic DevOps setup.

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend

- React
- Axios
- CSS

### DevOps & Tools

- Docker
- Docker Compose
- Swagger
- Winston
- Jest / Supertest

## Features

### Backend Features

- Create and list doctors
- Create and list patients
- Book appointments
- Cancel appointments
- Prevent overlapping appointments
- Generate available appointment slots dynamically
- Validation middleware
- Centralized error handling
- Structured logging using Winston
- Health check endpoint
- Swagger API documentation
- Unit and integration testing
- Seed script for realistic test data

### Frontend Features

- Home page
- Booking page
- Appointments list page
- Dynamic doctor selection
- Dynamic availability slots
- Appointment cancellation
- Loading, success, and error states

### DevOps Features

- Dockerized frontend and backend
- MongoDB container
- Docker Compose setup

## Project Structure

```txt
appointment-booking-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/   --> request and response handling
│   │   ├── middleware/    --> validation, logging, error handling
│   │   ├── models/        --> MongoDB schemas and models
│   │   ├── routes/        --> API route definitions
│   │   ├── services/      --> business logic and overlap logic
│   │   ├── config/        --> database configuration
│   │   ├── utils/         --> helper utilities
│   │   └── seed.js        --> database seed script
│   │
│   ├── tests/             --> unit and integration tests
│   ├── Dockerfile         --> backend Docker configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/           --> Axios API requests
│   │   ├── components/    --> reusable frontend components
│   │   ├── pages/         --> application pages/views
│   │   └── styles/        --> CSS styling
│   │
│   ├── Dockerfile         --> frontend Docker configuration
│   └── package.json
│
├── docs/                  --> architecture and troubleshooting documents
├── code-review/           --> code review task
├── troubleshooting-project/ --> debugging challenge task
├── docker-compose.yml     --> runs frontend/backend/mongodb together
└── README.md
```

````md
## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/appointment-booking
```
````

A `.env.example` file is also included in the repository.

---

## Running The Project

### Run With Docker

```bash
docker compose up --build
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:5000
```

Swagger API Docs:

```txt
http://localhost:5000/api-docs
```

## Seed Script

To populate the database with realistic test data:

```bash
docker compose exec backend node src/seed.js
```

The seed script creates:

- Doctors with different specialties
- Patients
- BOOKED and CANCELLED appointments
- Appointments across multiple days

The script is safe to run multiple times.

---

## API Documentation

Swagger documentation is available at:

```txt
http://localhost:5000/api-docs
```

---

## Testing

The project includes:

- Unit tests
- Integration tests

Run tests inside backend container:

```bash
docker compose exec backend npm test
```

## Architecture Decisions

### Layered Architecture

I used a layered architecture to separate responsibilities and improve maintainability.

- Routes handle API endpoint definitions
- Controllers handle requests and responses
- Services contain business logic
- Models define MongoDB schemas
- Middleware handles validation, logging, and errors

## Availability & Overlap Logic

Available slots are generated dynamically based on:

- Doctor working hours
- Existing Booked appointments
- Slot duration (30 minutes)

Overlap prevention is implemented by checking whether:

```txt
existing.start < newEnd
AND
existing.end > newStart
```

This ensures no overlapping Booked appointments can exist for the same doctor.

## MongoDB Indexes

Indexes were added to improve performance for time-based appointment queries.

Main indexed fields:

- doctorId
- start
- end
- status

These indexes help optimize:

- availability checks
- overlap detection
- doctor schedule queries

---

## Logging Strategy

Structured logging is implemented using Winston. The logging system includes:

- timestamps
- log levels
- request IDs
- doctor/patient identifiers

This improves debugging and request tracing.

## Scaling Ideas

If the system needed to support thousands of bookings per hour, I would improve scalability by:

- Using MongoDB replica sets and transactions
- Adding Redis caching
- Using load balancers
- Separating services into microservices if needed

## Future Improvements

If I had more time, I would add more features such as:

- Authentication and authorization (JWT)
- SMS reminders
- Waiting list system
- Real-time notifications
- Better UI/UX improvements

## Git Workflow

## Git Workflow

I organized my commits based on major project steps such as backend development, frontend implementation, Docker setup, seed script, and documentation. This helped keep the project more organized and easier to track.

If I needed to add SMS notifications while fixing an overlap bug, I would create separate branches for each task so both changes could be tested independently before merging.

## Monitoring & Observability

If deployed to production, I would monitor:

- bookings and cancellations
- API response times
- MongoDB performance
- container health

## Assumptions that I made

- Appointment duration is 30 minutes
- Doctors have configurable working hours
- Time slots are generated dynamically
- The system currently uses a single timezone
