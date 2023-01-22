const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/userRoutes");
const cors = require("cors");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const app = express();
app.use(express.json());
dotenv.config();

//  --------------redis --------------------------
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({
  url: REDIS_URL,
  port: REDIS_PORT,
  legacyMode: true,
});
redisClient.connect().catch((err) => {
  console.log(err);
});
app.enable("trust proxy");
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    cookie: {
      secure: false,
      resave: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
);
//----------------------redis-------------------------------

const PORT = process.env.PORT || 4000;
const URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch((err) => console.log("err:", err));

app.get("/api/v1", (req, res, next) => {
  try {
    res.send(`<h1>Server is Running hi</h1>`);
  } catch (err) {
    next(err);
  }
});
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", authRouter);

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
