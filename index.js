require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemsRouter = require("./routes/items");
const postsRouter = require("./routes/posts");

const app = express();

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://shajjad-dev.vercel.app/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use("/items", itemsRouter);
app.use("/posts", postsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
