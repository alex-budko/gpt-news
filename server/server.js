require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define User schema and model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, default: "US, NY" },
  messages: [
    {
      text: String,
      sender: String,
      gptResponses: [String],
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // const hashedPassword = await crypto
    //   .createHash("scrypt", { salt: process.env.SCRYPT_SALT, N: 16384, r: 8, p: 1, dkLen: 64 })
    //   .update(this.password)
    //   .digest("hex");
    this.password = password;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", UserSchema);

// Passport JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Auth routes
app.post("/register", async (req, res) => {
  try {
    const { username, password, location } = req.body;
    const user = new User({ username, password, location });
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login request:", { username, password });

    const user = await User.findOne({ username });
    console.log("User found:", user);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // const hashedPassword = crypto.scryptSync(password, process.env.SCRYPT_SALT, 64).toString("hex");

    // if (hashedPassword !== user.password) {
    //   return res.status(401).json({ error: "Invalid username or password" });
    // }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Protected route middleware
const requireAuth = passport.authenticate("jwt", { session: false });

// Save message and GPT response
app.post("/save-message", requireAuth, async (req, res) => {
  try {
    const { text, sender, gptResponses } = req.body;

    req.user.messages.push({ text, sender, gptResponses });
    await req.user.save();

    res.status(200).json({ message: "Message saved" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error saving message" });
  }
});

// Get all messages for the user
app.get("/messages", requireAuth, async (req, res) => {
  try {
    res.status(200).json({ messages: req.user.messages });
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.post("/generate-article-suggestions", requireAuth, async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const previousMessages = req.user.messages
      .filter((message) => message.sender === "user")
      .slice(-5)
      .map((message) => message.text)
      .join("\n");

    const context = `Previous queries of the user:${previousMessages}.
      \n User lives in ${req.user.location},
      \n Provide the user with some news articles related to the following topic: ${prompt}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: context,
      max_tokens: 250,
    });
    const suggestions = response.data.choices[0].text.split(/\n+/);

    // Save message and GPT response
    req.user.messages.push({
      text: prompt,
      sender: "user",
      gptResponses: suggestions,
    });
    await req.user.save();

    res.json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating article suggestions" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;
