const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const body = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const collections = require("./routers/Collections");
const items = require("./routers/Items");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const db = process.env.MONGOLAB_URI;

const app = express();

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("No errors detected in MongoDB");
  })
  .catch((error) => {
    console.log(`Error detected: ${error}`);
  });

app.use(cors());
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(helmet());

if (!fs.existsSync(path.join(__dirname, "logs"))) {
  fs.mkdirSync(path.join(__dirname, "logs"));
}
const date = new Date();
const accessLogStream = fs.createWriteStream(
  path.join(
    __dirname,
    "logs",
    `${date.toLocaleDateString().replace(/\//g, "-")}.log`
  ),
  {
    flags: "a",
  }
);
app.use(morgan("tiny", { stream: accessLogStream }));

app.use("/api/collections", collections);
app.use("/api/items", items);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Back-end running on PORT: ${PORT}`);
});
