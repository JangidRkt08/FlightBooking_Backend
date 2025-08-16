# Flight Booking Backend - Project Development Journey

## Table of Contents
1. [Project Overview](#project-overview)
2. [Initial Setup and Architecture](#initial-setup-and-architecture)
3. [Development Journey](#development-journey)
4. [Current Implementation Status](#current-implementation-status)
5. [Future Development Plans](#future-development-plans)

---

## Project Overview

This is a base Node.js project template for a Flight Booking Backend system, which has been prepared by keeping some of the most important code principles and project management recommendations. The project follows a clean architecture pattern with proper separation of concerns.

### Project Structure

`src` -> Inside the src folder all the actual source code regarding the project will reside. This will not include any kind of tests.

Let's take a look inside the `src` folder:

- **`config`** -> In this folder anything and everything regarding any configurations of setup of a library or module will be done. For example: setting up dotenv so that we can use the environment variables anywhere in a cleaner fashion, this is done in the "server-config.js". One more example can be to setup your logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- **`routes`** -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- **`middlewares`** -> They are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- **`controllers`** -> They are kind of the last middlewares as post them you call your business layer to execute the business logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- **`repositories`** -> This folder contains all the logic which we interact with DB by writing queries, all the raw queries or ORM queries will go there.

- **`services`** -> Contains the business logic and interacts with repositories for data from the DB.

- **`utils`** -> Contains helper methods, error classes etc.

---

## Initial Setup and Architecture

### Setup Instructions

1. **Download this template from github and open it in your favourite text editor.**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   - In the root directory create a `.env` file and add the following env variables:
   ```
   PORT=<port number of your choice>
   ```
   Example:
   ```
   PORT=3000
   ```

4. **Database Setup:**
   - Go inside the `src` folder and execute the following command:
   ```bash
   npx sequelize init
   ```
   - By executing the above command you will get migration, seeders folder and config.json inside config folder.

5. **Database Configuration:**
   - If you're setting up your development env, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb, etc.
   - If you're setting up test or prod environment, make sure you also replace the host with hosted url

6. **Run the server:**
   ```bash
   npm run dev
   ```

---

## Development Journey

### Phase 1: Project Foundation (Initial Setup)

**Date: Project Start**

#### What was implemented:
1. **Basic Express Server Setup**
   - Created main entry point (`src/index.js`)
   - Configured Express middleware for JSON and URL-encoded data
   - Set up basic routing structure with `/api` prefix

2. **Configuration Management**
   - **Server Configuration** (`src/config/server-config.js`):
     - Implemented dotenv configuration for environment variables
     - Set up PORT configuration from environment variables
   
   - **Logger Configuration** (`src/config/logger-config.js`):
     - Implemented Winston logger with custom formatting
     - Configured console and file transports
     - Custom timestamp format: `YYYY-MM-DD HH:mm:ss`
     - Log file: `combined.log`

3. **Project Dependencies**
   - **Core Dependencies:**
     - `express`: ^5.1.0 (Web framework)
     - `dotenv`: ^17.2.1 (Environment variables)
     - `winston`: ^3.17.0 (Logging)
     - `http-status-codes`: ^2.3.0 (HTTP status codes)
   
   - **Database Dependencies:**
     - `sequelize`: ^6.37.7 (ORM)
     - `sequelize-cli`: ^6.6.3 (CLI tools)
     - `mysql2`: ^3.14.3 (MySQL driver)
   
   - **Development Dependencies:**
     - `nodemon`: ^3.1.10 (Auto-restart server)

#### Why this was important:
- **Separation of Concerns**: Each configuration aspect is isolated in its own module
- **Environment Management**: Proper environment variable handling for different deployment scenarios
- **Logging Infrastructure**: Structured logging for debugging and monitoring
- **Database Abstraction**: ORM setup for clean database interactions

### Phase 2: Database Layer Implementation

**Date: Database Setup**

#### What was implemented:
1. **Database Migration System**
   - Created migration file: `20250802185201-create-airplane.js`
   - Implemented Airplane table with fields:
     - `id`: Auto-incrementing primary key
     - `modelNumber`: String (required, default: '')
     - `capacity`: Integer (default: 0)
     - `createdAt` and `updatedAt`: Timestamps

2. **Sequelize Model**
   - Created `src/models/airplane.js`
   - Defined model structure with validation rules
   - Set up associations (currently empty, ready for future relationships)

3. **Database Seeding**
   - Created seeder file: `20250814193945-add-airplanes.js`
   - Pre-populated with sample data:
     - Boeing 737 (capacity: 200)
     - Boeing 747 (capacity: 300)

#### Why this was important:
- **Version Control for Database**: Migrations provide database schema versioning
- **Data Consistency**: Proper model definitions ensure data integrity
- **Development Data**: Seeders provide realistic test data
- **Scalability**: Foundation for adding more entities and relationships

### Phase 3: Repository Pattern Implementation

**Date: Data Access Layer**

#### What was implemented:
1. **Generic CRUD Repository** (`src/repositories/crud-repository.js`)
   - **Core Methods:**
     - `create(data)`: Create new records
     - `destroy(data)`: Delete records by ID
     - `get(data)`: Find record by primary key
     - `getAll()`: Retrieve all records
     - `update(id, data)`: Update records by ID

2. **Specific Repository** (`src/repositories/airplane-repository.js`)
   - Extends generic CRUD repository
   - Specialized for Airplane entity
   - Ready for airplane-specific business logic

#### Why this was important:
- **Code Reusability**: Generic CRUD operations can be reused across entities
- **Maintainability**: Centralized data access logic
- **Testability**: Easy to mock and test data access layer
- **Scalability**: Easy to add new entities with minimal code duplication

### Phase 4: Business Logic Layer

**Date: Service Layer Implementation**

#### What was implemented:
1. **Airplane Service** (`src/services/airplane-service.js`)
   - **createAirplane(data)**: Creates new airplane with error handling
   - **getAirplanes()**: Retrieves all airplanes with error handling
   - **Error Handling**: Specific handling for Sequelize validation errors
   - **Custom Error Responses**: Proper error messages and status codes

#### Why this was important:
- **Business Logic Isolation**: Business rules separated from data access
- **Error Handling**: Centralized error management with proper HTTP status codes
- **Validation**: Database-level validation error handling
- **Service Layer Pattern**: Clean separation between controllers and repositories

### Phase 5: Controller Layer Implementation

**Date: API Controllers**

#### What was implemented:
1. **Airplane Controller** (`src/controllers/airplane-controller.js`)
   - **createAirplane(req, res)**: Handles POST requests for airplane creation
   - **getAirplanes(req, res)**: Handles GET requests for airplane retrieval
   - **Response Standardization**: Consistent success and error response format
   - **HTTP Status Codes**: Proper status codes (201 for creation, 200 for retrieval)

2. **Info Controller** (`src/controllers/info-controller.js`)
   - Basic info endpoint for API health checks

#### Why this was important:
- **Request/Response Handling**: Proper HTTP request processing
- **Response Consistency**: Standardized API response format
- **Error Propagation**: Proper error handling from service layer
- **API Documentation**: Clear endpoint structure for frontend integration

### Phase 6: Middleware Implementation

**Date: Request Validation**

#### What was implemented:
1. **Airplane Middleware** (`src/middlewares/airplane-middleware.js`)
   - **validateCreateRequest(req, res, next)**: Validates airplane creation requests
   - **Required Field Validation**: Ensures modelNumber is present
   - **Error Response**: Returns proper error response for validation failures
   - **HTTP Status Codes**: Returns 400 (Bad Request) for validation errors

#### Why this was important:
- **Input Validation**: Prevents invalid data from reaching business logic
- **Security**: Validates required fields before processing
- **User Experience**: Clear error messages for invalid requests
- **Data Integrity**: Ensures only valid data enters the system

### Phase 7: Routing Implementation

**Date: API Routes**

#### What was implemented:
1. **Route Structure**
   - **Main Routes** (`src/routes/index.js`): Central route registration
   - **Versioned Routes** (`src/routes/v1/index.js`): API versioning support
   - **Airplane Routes** (`src/routes/v1/airplane-routes.js`): Airplane-specific endpoints

2. **API Endpoints**
   - **POST /api/v1/airplanes**: Create new airplane
   - **GET /api/v1/airplanes**: Retrieve all airplanes
   - **Middleware Integration**: Validation middleware applied to POST requests

#### Why this was important:
- **API Versioning**: Foundation for future API versions
- **Route Organization**: Clean separation of route concerns
- **Middleware Integration**: Proper request validation flow
- **RESTful Design**: Standard REST API patterns

### Phase 8: Utility Layer Implementation

**Date: Helper Functions and Error Handling**

#### What was implemented:
1. **Response Utilities**
   - **Success Response** (`src/utils/common/success-response.js`): Standardized success response format
   - **Error Response** (`src/utils/common/error-response.js`): Standardized error response format

2. **Custom Error Classes**
   - **AppError** (`src/utils/errors/app-error.js`): Custom error class with status codes
   - **Error Propagation**: Proper error handling throughout the application

#### Why this was important:
- **Response Consistency**: Uniform API response format
- **Error Management**: Centralized error handling
- **Debugging**: Better error tracking and debugging capabilities
- **API Standards**: Consistent response structure for frontend integration

---

## Current Implementation Status

### ✅ Completed Features:
1. **Basic Express Server** with proper middleware setup
2. **Configuration Management** with environment variables and logging
3. **Database Layer** with Sequelize ORM, migrations, and seeders
4. **Repository Pattern** with generic CRUD operations
5. **Service Layer** with business logic and error handling
6. **Controller Layer** with proper request/response handling
7. **Middleware** for request validation
8. **Routing** with API versioning support
9. **Utility Layer** with standardized responses and error handling

### 🔧 Current API Endpoints:
- **POST /api/v1/airplanes** - Create new airplane
- **GET /api/v1/airplanes** - Get all airplanes

### 📊 Database Schema:
- **Airplanes Table** with modelNumber and capacity fields
- **Sample Data** with Boeing 737 and 747 entries

### 🛠️ Technical Stack:
- **Backend**: Node.js with Express
- **Database**: MySQL with Sequelize ORM
- **Logging**: Winston with file and console transports
- **Development**: Nodemon for auto-restart

---
<!-- 
## Future Development Plans

### Phase 9: Enhanced Features (Planned)
1. **Authentication & Authorization**
   - JWT token implementation
   - User roles and permissions
   - Protected routes

2. **Additional Entities**
   - Flight management
   - Booking system
   - User management
   - Airport management

3. **Advanced Features**
   - Search and filtering
   - Pagination
   - Sorting capabilities
   - Advanced validation

4. **Testing**
   - Unit tests for services
   - Integration tests for API endpoints
   - Database testing

5. **Documentation**
   - API documentation with Swagger
   - Code documentation
   - Deployment guides

### Phase 10: Production Readiness (Planned)
1. **Performance Optimization**
   - Database indexing
   - Caching strategies
   - Query optimization

2. **Security Enhancements**
   - Input sanitization
   - Rate limiting
   - CORS configuration

3. **Monitoring & Logging**
   - Application monitoring
   - Error tracking
   - Performance metrics

4. **Deployment**
   - Docker containerization
   - CI/CD pipeline
   - Environment-specific configurations

---

## Development Notes

### Key Design Decisions:
1. **Layered Architecture**: Clear separation between routes, controllers, services, and repositories
2. **Error Handling**: Centralized error management with proper HTTP status codes
3. **Response Standardization**: Consistent API response format
4. **Database Migrations**: Version-controlled database schema changes
5. **API Versioning**: Foundation for future API evolution

### Best Practices Implemented:
1. **Single Responsibility Principle**: Each module has a single, well-defined purpose
2. **Dependency Injection**: Services depend on repositories, not direct database access
3. **Error Propagation**: Errors bubble up through layers with proper context
4. **Configuration Management**: Environment-specific configurations
5. **Logging**: Structured logging for debugging and monitoring

### Lessons Learned:
1. **Planning Architecture**: Proper planning of folder structure saves time in long run
2. **Error Handling**: Centralized error handling reduces code duplication
3. **Validation**: Input validation at middleware level prevents invalid data processing
4. **Response Consistency**: Standardized response format improves frontend integration
5. **Database Design**: Proper migration strategy ensures data integrity

---
-->
*This document will be updated as the project evolves. Each new development phase will be documented here with detailed explanations of what was implemented, why it was important, and how it contributes to the overall project goals.*  