# 🧠 SkillShare Marketplace App

A full-stack skill-sharing marketplace built with:

- 🧩 **Frontend**: Next.js 15 (React 19, Tailwind CSS)
- 🛠 **Backend**: Express.js + TypeScript
- 🗃 **Database**: PostgreSQL with Prisma ORM
- 🐳 **Deployment**: Docker + Docker Compose

---

## 📁 Project Structure

```
skillshare/
├── client/               # Next.js frontend
├── rest-api/             # Express API backend
├── shared/               # Shared Config between services
├── docker-compose.yml    # Multi-container setup
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vikashd03/skillshare-marketplace.git
cd skillshare
```

---

### 2. Environment Variables for Services

#### 🌐 `client/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 🛠 `rest-api/.env`

```env
PORT=5000
TASK_SERVICE_URI=localhost:4000
DATABASE_URL=ostgresql://skill_user:skill_pass@db:5432/skillshare
TASK_GRPC_PROTO=/shared/proto/
```

#### 🛠 `task-service/.env`

```env
PORT=4000
DATABASE_URL=postgresql://skill_user:skill_pass@db:5432/skillshare
TASK_GRPC_PROTO=/shared/proto/
```

#### 🛠 `shared/.env`

```env
DATABASE_URL=postgresql://skill_user:skill_pass@db:5432/skillshare
```

> **Note**: Do not commit actual secrets. Use `.env.example` for safe defaults.

---

### 3. Start the App (Docker)

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Rest API: [http://localhost:5000/api](http://localhost:5000/api)  
- Task gRpc: [localhost:4000](localhost:5000)  
- DB: localhost:5432

---

## 🧪 Development

### Start Client Server (locally)

```bash
cd client
npm install
npm run dev
```

### Run Prisma Migrations (locally)

```bash
cd shared
npm run migrate:dev
```

This:

- Applies the migration to your local DB

### Generate Prisma Client for Services (locally)

```bash
cd rest-api
npm run generate:prisma
```
```bash
cd task-service
npm run generate:prisma
```

### Generate Proto types for Services (locally)

```bash
cd rest-api
npm run generate:proto
```
```bash
cd task-service
npm run generate:proto
```

### Start Backend Services (locally)

```bash
cd rest-api
npm run dev
```
```bash
cd task-service
npm run dev
```

---

### Prisma Studio (DB GUI)

```bash
npx prisma studio
```

---

### Useful Docker Commands

```bash
# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Run Prisma CLI inside backend container
docker exec -it skillshare-api npx prisma migrate deploy
```

---

## 📦 Scripts

### Client

- `dev`: Start Next.js in development mode
- `build`: Build the production version
- `start`: Start the production server

### Rest API (`rest-api`)

- `dev`: Run the Express server in development with hot-reload
- `build`: Compile TypeScript to JavaScript
- `start`: Start the compiled server
- `test`: Run Unit Test cases

### Task gRpc Service (`task-service`)

- `dev`: Run the gRpc server in development with hot-reload
- `build`: Compile TypeScript to JavaScript
- `start`: Start the compiled server
- `test`: Run Unit Test cases

---

## 🧩 Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | Next.js, React 19, Tailwind CSS      |
| Backend   | Express.js, TypeScript, gRPC         |
| Database  | PostgreSQL                           |
| ORM       | Prisma                               |
| Auth (opt)| Basic Auth / JWT / OAuth2            |
| DevOps    | Docker, Docker Compose               |

---

## ✅ Best Practices

- Use `.env.example` to document required env vars
- Keep Prisma migrations under version control
- Use `npx prisma migrate deploy` in CI/CD or Docker
- Separate development and production configurations

---

## 📄 License

MIT © 2025 [Vikash Dhanabal]
