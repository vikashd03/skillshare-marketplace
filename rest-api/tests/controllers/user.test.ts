jest.mock("../../src/config/db", () => {
  return {
    __esModule: true,
    default: {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    },
  };
});

jest.mock("../../src/utils/auth", () => ({
  verifyPassword: jest.fn(),
  hashPassword: jest.fn(),
}));

import request from "supertest";
import app from "../../src/app";
import prisma from "@/config/db";
import * as authUtils from "@/utils/auth";

const mockedPrisma = prisma as any;
const mockedAuthUtils = authUtils as any;

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should return 404 if email already exists", async () => {
      mockedPrisma.user.findUnique.mockResolvedValue({
        id: "abc",
        email: "test@example.com",
      });

      const res = await request(app).post("/api/user/register").send({
        email: "test@example.com",
        password: "123456",
        name: "John",
        ph_no: "65656564",
      });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Email Already Taken" });
      expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });

    it("should create user and return 200", async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null);
      mockedPrisma.user.create.mockResolvedValue({
        id: "abc",
        email: "test@example.com",
      });
      mockedAuthUtils.hashPassword.mockResolvedValue("123456");

      const res = await request(app).post("/api/user/register").send({
        email: "test@example.com",
        password: "123456",
        name: "John",
        ph_no: "65656564",
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ msg: "Signed Up" });
      expect(mockedPrisma.user.create).toHaveBeenCalled();
    });

    it("should handle create user failure with 500", async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null);
      mockedPrisma.user.create.mockResolvedValue(null);
      mockedAuthUtils.hashPassword.mockResolvedValue("123456");

      const res = await request(app).post("/api/user/register").send({
        email: "new@example.com",
        password: "123456",
        name: "Jane",
        ph_no: "65656564",
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Error in creating User" });
    });
  });

  describe("POST /login", () => {
    it("should return 404 if user not found", async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null);
      mockedAuthUtils.verifyPassword.mockResolvedValue(false);

      const res = await request(app)
        .post("/api/user/login")
        .send({ email: "notfound@example.com", password: "123456" });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "User Not Found" });
    });

    it("should return 401 if password invalid", async () => {
      mockedPrisma.user.findUnique.mockResolvedValue({
        email: "found@example.com",
        password: "hashedpass",
      });

      mockedAuthUtils.verifyPassword.mockResolvedValue(false);

      const res = await request(app)
        .post("/api/user/login")
        .send({ email: "found@example.com", password: "wrongpass" });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: "Passowrd is Invalid" });
    });

    it("should return 200 if login successful", async () => {
      mockedPrisma.user.findUnique.mockResolvedValue({
        email: "found@example.com",
        password: "correctpass",
      });

      mockedAuthUtils.verifyPassword.mockResolvedValue(true);

      const res = await request(app)
        .post("/api/user/login")
        .send({ email: "found@example.com", password: "correctpass" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ msg: "Signed In" });
    });
  });

  describe("GET /me", () => {
    it("should return 200 and user details without sensitive fields", async () => {
      // Mock user attached to req.user
      const user = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        password: "hashed",
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockedPrisma.user.findUnique.mockResolvedValue({
        ...user,
      });
      mockedAuthUtils.verifyPassword.mockResolvedValue(true);

      const res = await request(app)
        .get("/api/user/me")
        .set(
          "authorization",
          `Basic ${btoa(`${user.email}:${user.password}`)}`
        );
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: "1",
        email: "test@example.com",
        name: "Test User",
      });
      expect(res.body.password).toBeUndefined();
      expect(res.body.created_at).toBeUndefined();
    });

    it("should return 404 if user not found in request", async () => {
      const res = await request(app).get("/api/user/me");

      expect(res.status).toBe(401);
      expect(res.text).toEqual("Authentication required.");
    });
  });
});
