require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.post('/generate-article-suggestions', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `News articles related to ${prompt}:`,
      max_tokens: 250,
    });

    console.log(response)

    

    res.json({ suggestions: response.data.choices[0].text.split(/\n+/) });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating article suggestions' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
