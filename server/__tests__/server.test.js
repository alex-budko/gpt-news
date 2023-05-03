const request = require("supertest");
const app = require("../server");

describe("API Endpoints", () => {
  test("GET /messages should return 401 if not logged in", async () => {
    const response = await request(app).get("/messages");
    expect(response.statusCode).toBe(401);
  });
});
