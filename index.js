const express = require("express");
const cors = require("cors");
const connect = require("./src/utils/connect");

const PORT = process.env.PORT || 8081;

const app = express();
connect();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("*", (req, res, next) => {
  const error = new error(" Route not found");
  error.status = 404;
  return next(error);
});
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});
app.disable("x-powered-by");
{
  PORT;
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
