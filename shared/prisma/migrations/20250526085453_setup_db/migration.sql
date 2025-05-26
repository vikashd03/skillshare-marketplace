-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PROVIDER');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'AUD', 'SGD', 'INR');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('ONSITE', 'ONLINE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "RSVPStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FRONTEND_DEVELOPMENT', 'CYBERSECURITY', 'DIGITAL_MARKETING', 'UI_UX_DESIGN', 'DATA_ENGINEERING');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "user_type" "UserType" NOT NULL,
    "name" TEXT,
    "rep_name" TEXT,
    "company_name" TEXT,
    "tax_no" TEXT,
    "ph_no" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "experience" INTEGER NOT NULL,
    "nature" "WorkMode" NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "provider_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expected_start_date" TIMESTAMP(3) NOT NULL,
    "expected_hours" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "offered" BOOLEAN NOT NULL DEFAULT false,
    "hourly_rate_offered" DOUBLE PRECISION,
    "rate_currency" "Currency",
    "task_status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "offer_rsvp" "RSVPStatus" NOT NULL DEFAULT 'PENDING',
    "completion_rsvp" "RSVPStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
