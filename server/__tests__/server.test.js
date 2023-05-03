const request = require("supertest");
const app = require("../server");
const User = require("../models/User");

const testUser = {
  username: "testuser",
  password: "testpassword",
};

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
});

test("Register a new user", async () => {
  const res = await request(app).post("/register").send(testUser);
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("token");
});

test("Login with registered user", async () => {
  const res = await request(app).post("/login").send(testUser);
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
  expect(res.body).toHaveProperty("user");
});

test("Fail to login with wrong credentials", async () => {
  const res = await request(app).post("/login").send({
    username: "wrongusername",
    password: "wrongpassword",
  });
  expect(res.statusCode).toBe(401);
});
