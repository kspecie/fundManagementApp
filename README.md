# Titanbay Task

A RESTful API for managing private equity funds, investors, and investments built with Node.js, TypeScript, Express, and PostgreSQL.

## 🚀 Quick Start (Minimal Setup)

### Prerequisites

- **Docker** and **Docker Compose** (recommended)
- **Node.js 20+** and **npm** (for local development)
- **PostgreSQL 15+** (for local development without Docker)

### Option 1: Docker (Recommended - Zero Configuration)

1. **Clone the repository**

   ```bash
   git clone https://github.com/kspecie/titanBayTask.git
   cd titanBayTask
   ```

2. **Create environment file and update password**

   ```bash
   cp .env.example .env
   ```

3. **Start the application**

   ```bash
   npm run docker:up
   ```

   That's it! The application will be available at `http://localhost:3000`

   The setup includes:

   - ✅ PostgreSQL database with automatic schema creation
   - ✅ Sample data seeding (funds, investors, investments)
   - ✅ API server with hot reload
   - ✅ Database connection waiting logic

### Option 2: Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/kspecie/titanBayTask.git
   cd titanBayTask
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up PostgreSQL database**

   - Create a database named `titanbay_database`
   - Update `.env` with your database credentials (update the password) and update DB_HOST to 'localhost'. 

5. **Run database setup**

   ```bash
   # For local setup, run the SQL files manually:
   psql -d titanbay_db -f src/db/schema.sql
   psql -d titanbay_db -f src/db/seed.sql
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

| Command                       | Description                              |
| ----------------------------- | ---------------------------------------- |
| `npm run dev`                 | Start development server with hot reload |
| `npm run build`               | Build TypeScript to JavaScript           |
| `npm start`                   | Start production server                  |
| `npm run docker:up`           | Start application with Docker Compose    |
| `npm run docker:build`        | Build Docker images                      |
| `npm run docker:restart`      | Restart with fresh database              |
| `npm run docker:soft-restart` | Restart without clearing databas    |
| `npm run docker:logs`         | View applicationlogs                |

## 🌐 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Funds Management

#### Get All Funds

```http
GET /api/funds
```

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Titanbay Growth Fund I",
    "vintage_year": 2024,
    "target_size_usd": 250000000.64,
    "status": "Fundraising",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Specific Fund

```http
GET /api/funds/{fund_id}
```

#### Create New Fund

```http
POST /api/funds
Content-Type: application/json

{
  "name": "New Fund Name",
  "vintage_year": 2024,
  "target_size_usd": 100000000,
  "status": "Fundraising"
}
```

#### Update Existing Fund

```http
PUT /api/funds/{fund_id}
Content-Type: application/json

{
  "name": "Updated Fund Name",
  "vintage_year": 2024,
  "target_size_usd": 150000000,
  "status": "Investing"
}
```

### Investment Management

#### Get Fund Investments

```http
GET /api/funds/{fund_id}/investments
```

**Response:**

```json
[
  {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "fund_id": "550e8400-e29b-41d4-a716-446655440000",
    "investor_id": "770e8400-e29b-41d4-a716-446655440002",
    "amount_usd": 50000000,
    "investment_date": "2024-03-15"
  }
]
```

#### Create Investment for Fund

```http
POST /api/funds/{fund_id}/investments
Content-Type: application/json

{
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "amount_usd": 75000000,
  "investment_date": "2024-09-22"
}
```

**Response:**

```json
{
  "id": "aa0e8400-e29b-41d4-a716-446655440005",
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "fund_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_usd": 75000000,
  "investment_date": "2024-09-22"
}
```

### Investor Management

#### Get All Investors

```http
GET /api/investors
```

**Response:**

```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "name": "Goldman Sachs Asset Management",
    "investor_type": "Institution",
    "email": "investments@gsam.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create New Investor

```http
POST /api/investors
Content-Type: application/json

{
  "name": "New Investor Name",
  "investor_type": "Individual",
  "email": "investor@example.com"
}
```

## 🗄️ Database Schema

### Funds Table

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique)
- `vintage_year` (INTEGER, 1900-current year+1)
- `target_size_usd` (NUMERIC, >= 0)
- `status` (ENUM: 'Fundraising', 'Investing', 'Closed')
- `created_at` (TIMESTAMP)

### Investors Table

- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `investor_type` (ENUM: 'Individual', 'Institution', 'Family Office')
- `email` (VARCHAR, Unique)
- `created_at` (TIMESTAMP)

### Investments Table

- `id` (UUID, Primary Key)
- `fund_id` (UUID, Foreign Key)
- `investor_id` (UUID, Foreign Key)
- `amount_usd` (NUMERIC, > 0)
- `investment_date` (DATE, <= current date)
- `created_at` (TIMESTAMP)

## 📊 Sample Data

The application comes pre-loaded with sample data:

### Funds (5 sample funds)

- Titanbay Growth Fund I (2024, Fundraising)
- Apollo Credit Fund IV (2023, Investing)
- Sequoia Capital Fund XVIII (2022, Closed)
- Blackstone Real Estate Partners X (2024, Fundraising)
- KKR Americas Fund XIII (2023, Investing)

### Investors (10 sample investors)

- 4 Institutional investors (Goldman Sachs, CalPERS, Yale Endowment, OTPP)
- 3 Family offices (Bezos, Pritzker, Walton)
- 3 Individual investors

### Investments (15 sample investments)

- Multiple investments across different funds
- Various investment amounts and dates
- Demonstrates the relationship between funds and investors

## 🏗️ Architecture & Design Decisions

### Technology Stack

- **Backend**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Native pg driver (no ORM for simplicity)
- **Containerization**: Docker & Docker Compose

### Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Database operations
├── routes/         # API route definitions
├── db/            # Database configuration and SQL files
└── server.ts      # Application entry point
```

### Design Decisions

#### 1. **Database-First Approach**

- PostgreSQL schema defined in SQL files
- Strong database constraints and validation
- UUID primary keys for all entities
- Comprehensive foreign key relationships

#### 2. **RESTful API Design**

- Resource-based URLs (`/api/funds`, `/api/investors`)
- Standard HTTP methods (GET, POST, PUT)
- Nested resources (`/api/funds/{id}/investments`)
- Consistent JSON responses

#### 3. **TypeScript Integration**

- Full TypeScript support for type safety
- Interface definitions for all data models
- Compile-time error checking

#### 4. **Docker-First Development**

- Complete containerized setup
- Automatic database initialization
- Zero-configuration local development
- Production-ready deployment

#### 5. **Database Constraints as Validation**

- Primary validation at database level
- Check constraints for business rules
- Foreign key constraints for data integrity
- Unique constraints for data consistency

### Assumptions Made

1. **Fund Management**: Each fund has a unique name and belongs to a specific vintage year
2. **Investment Rules**: Investors can only invest once per fund (unique constraint)
3. **Date Validation**: Investment dates cannot be in the future
4. **Amount Validation**: Investment amounts must be positive
5. **Status Progression**: Funds can be in Fundraising, Investing, or Closed states
6. **Investor Types**: Three distinct investor categories (Individual, Institution, Family Office)

## 🚨 Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:

```json
{
  "error": "Error message description"
}
```

## 🔍 API Testing

### Using curl

```bash
# Get all funds
curl http://localhost:3000/api/funds

# Create a new fund
curl -X POST http://localhost:3000/api/funds \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Fund",
    "vintage_year": 2024,
    "target_size_usd": 100000000,
    "status": "Fundraising"
  }'

# Get fund investments
curl http://localhost:3000/api/funds/550e8400-e29b-41d4-a716-446655440000/investments
```

### Using Postman/Insomnia

Import the API endpoints using the base URL: `http://localhost:3000/api`


## 📝 Development Notes

- The application uses `wait-for-db.sh` to ensure PostgreSQL is ready before starting
- Database schema and seed data are automatically loaded on first startup
- Hot reload is enabled in development mode
- All database operations use parameterized queries to prevent SQL injection
- TypeScript compilation happens automatically in development
- Two additional branches available:
  1. features/error-handling
  2. testing

---

**Author**: Kayla Specie  
**Version**: 1.0.0  
**Last Updated**: 2025
