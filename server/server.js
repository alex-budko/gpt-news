const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');

const app = express();
const redis = new Redis();

app.use(cors());

app.get('/getLove', async (_, res) => {
  const value = await redis.get('mykey');
  res.json({ value });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
