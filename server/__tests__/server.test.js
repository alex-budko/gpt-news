const request = require('supertest');
const app = require('../server');

test('GET /messages without auth should return 401 status code', async () => {
  const response = await request(app).get('/messages');
  expect(response.statusCode).toBe(401);
});

test('POST /register with valid credentials should return 201 status code', async () => {
  const response = await request(app)
    .post('/register')
    .send({ username: 'testuser', password: 'testpassword', location: 'US, CA' });
  expect(response.statusCode).toBe(201);
});

test("POST /register with missing credentials should return 500 status code", async () => {
  const response = await request(app).post("/register").send({});
  expect(response.statusCode).toBe(500);
});

test("POST /generate-article-suggestions with missing prompt should return 500 status code", async () => {
  const token = generateToken();
  const response = await request(app)
    .post("/generate-article-suggestions")
    .set("Authorization", `Bearer ${token}`)
    .send({});
  expect(response.statusCode).toBe(500);
});
