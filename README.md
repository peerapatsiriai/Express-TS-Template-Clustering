# Express TypeScript Template

A robust, production-ready Express.js application template built with TypeScript, featuring a clean architecture, database integration with Prisma, and comprehensive middleware setup.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express.js**: Fast, unopinionated web framework for Node.js
- **Prisma ORM**: Type-safe database access with SQLite
- **Clean Architecture**: Modular structure with separation of concerns
- **Cluster Support**: Multi-process scaling for production environments
- **Request Validation**: Zod schema validation for API endpoints
- **Custom Response Handler**: Standardized API response format
- **Docker Support**: Containerized deployment ready
- **Security**: CORS and Helmet middleware for security
- **Development Tools**: Nodemon for hot reloading during development

## 📁 Project Structure

```
src/
├── app.ts                 # Main application entry point
├── appConfig.ts          # Application configuration
├── database/
│   └── prisma.ts         # Database connection setup
├── middlewares/
│   ├── example.ts        # Example middleware
│   └── responseHandler.ts # Custom response handler
├── modules/
│   └── user/
│       ├── user.controller.ts  # User request handlers
│       ├── user.dto.ts         # Data transfer objects
│       ├── user.repository.ts  # Database operations
│       ├── user.route.ts       # User routes
│       ├── user.schema.ts      # Zod validation schemas
│       └── user.service.ts     # Business logic
├── routes/
│   └── index.ts          # Main router configuration
└── utils/
    └── showLogo.ts       # Application logo utility
```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Process Management**: Cluster for production scaling

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Express-TypeScript-Template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL="file:./dev.db"
CPU_COUNT=4
NODE_ENV=development
DEBUG=1
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm start
```

The application will be available at `http://localhost:5000`

## 📚 API Endpoints

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| GET | `/api/users` | Get all users |

### Example Request/Response

#### Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
}
```

#### Get All Users
```bash
GET /api/users
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
  ]
}
```

## 🏗️ Architecture Overview

### Clean Architecture Principles

This template follows clean architecture principles with clear separation of concerns:

1. **Controller Layer** (`user.controller.ts`): Handles HTTP requests and responses
2. **Service Layer** (`user.service.ts`): Contains business logic
3. **Repository Layer** (`user.repository.ts`): Handles data access and database operations
4. **DTO Layer** (`user.dto.ts`): Defines data transfer objects
5. **Schema Layer** (`user.schema.ts`): Validation schemas using Zod

### Middleware Stack

- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Body Parser**: Request body parsing with 1GB limit
- **Custom Response Handler**: Standardized API responses
- **Example Middleware**: Template for custom middleware

### Cluster Support

The application supports clustering for production environments:
- Automatically detects CPU cores
- Spawns worker processes based on `CPU_COUNT` environment variable
- Graceful worker replacement on crashes
- Debug mode bypasses clustering for development

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t express-typescript-template .

# Run the container
docker run -p 5000:5000 express-typescript-template
```

### Docker Compose (Optional)

Create a `docker-compose.yml` file for easier deployment:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./data/dev.db
    volumes:
      - ./data:/app/data
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `DATABASE_URL` | `file:./dev.db` | Database connection string |
| `CPU_COUNT` | CPU cores count | Number of worker processes |
| `NODE_ENV` | `development` | Environment mode |
| `DEBUG` | `0` | Debug mode (1 for enabled) |

### TypeScript Configuration

The project uses strict TypeScript configuration:
- Target: ES6
- Module: CommonJS
- Strict mode enabled
- Path mapping for clean imports (`@/*`)

## 🧪 Development

### Available Scripts

```bash
npm run start:dev    # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server
```

### Adding New Modules

1. Create module directory in `src/modules/`
2. Implement the following files:
   - `module.controller.ts` - Request handlers
   - `module.service.ts` - Business logic
   - `module.repository.ts` - Database operations
   - `module.route.ts` - Route definitions
   - `module.schema.ts` - Validation schemas
   - `module.dto.ts` - Data transfer objects

3. Register routes in `src/routes/index.ts`

### Database Operations

Use Prisma for all database operations:

```typescript
// Example: Create a new record
const user = await prisma.user.create({
  data: { name, email, password }
});

// Example: Find records
const users = await prisma.user.findMany();
```

## 🚀 Production Deployment

### Performance Considerations

1. **Clustering**: Enable clustering for multi-core utilization
2. **Database**: Consider migrating from SQLite to PostgreSQL for production
3. **Caching**: Implement Redis for session management and caching
4. **Load Balancing**: Use nginx or similar for load balancing
5. **Monitoring**: Add application monitoring (e.g., PM2, New Relic)

### Security Checklist

- [ ] Update all dependencies to latest versions
- [ ] Implement proper authentication and authorization
- [ ] Add rate limiting middleware
- [ ] Configure HTTPS in production
- [ ] Implement input sanitization
- [ ] Add request logging and monitoring
- [ ] Secure database credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔄 Changelog

### v1.0.0
- Initial release
- Express.js with TypeScript setup
- Prisma ORM integration
- User management module
- Docker support
- Cluster support for production

---

**Happy Coding! 🎉**
