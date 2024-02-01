# Patient management system

## Description

This monorepo houses two distinct applications that collectively manage patient data effectively:

1. **NestJS API with Redis and PostgreSQL**: A powerful API built using NestJS framework, utilizing Redis for token storing and PostgreSQL for data storage.
2. **Vite App with Redux Toolkit and RTK Query**: A modern web application scaffolded with Vite, incorporating state management with Redux Toolkit and data fetching with RTK Query.

## Features

### NestJS API with Redis and PostgreSQL

- **NestJS Framework**: Utilizes the robust NestJS framework for building scalable and maintainable APIs.
- **Redis for Token Storing**: Securely stores authentication tokens using Redis, enhancing security and performance.
- **PostgreSQL for Data Storage**: Utilizes PostgreSQL, a powerful relational database, for efficient data storage and retrieval.
- **Dockerized Environment**: Docker-compose setup for easy deployment and development.

### Vite App with Redux Toolkit and RTK Query

- **Vite Build Tool**: Leveraging the fast build times and modern development experience provided by Vite.
- **Redux Toolkit**: Efficient state management using Redux Toolkit, reducing boilerplate code and enhancing developer productivity.
- **RTK Query**: Simplified data fetching and caching with RTK Query, streamlining API interactions.
- **Integration with NestJS API**: Seamlessly integrates with the NestJS API for data retrieval and manipulation.

## Instructions

### Getting Started

1. Clone the repository to your local machine:

```bash
  git clone <repository-url>
```

2. Navigate to the root directory of the cloned repository:

```bash
cd <repository-folder>
```

#### Running the System with Docker Compose

1. Ensure you have Docker and Docker Compose installed on your system.
2. Create `.env` file in the root directory with the following variables

```env
# APPLICATION
NODE_ENV=development

# DATABASE
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=patient

# REDIS
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_DATABASE=1
REDIS_KEY_PREFIX=redis

# JWT
JWT_SECRET=this_is_very_secret
JWT_ACCESS_TOKEN_TTL=30000s
```

3. Run the following command to start the system:

```bash
docker-compose up
```

4. Once the containers are up and running, you can access:

- NestJS API: http://localhost:3000
- API Swagger Doc: http://localhost:3000/docs
- Vite App: http://localhost:8080

5. To be able to use the application you need to create some insurance type in the system, to do that open the swagger doc by visiting the following link

```
http://localhost:3000/docs
```

6. Submit the `/insurances` POST request with the following data

```json
{
  "name": "CNSS"
}
```
