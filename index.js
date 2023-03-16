const express = require("express");
const cors = require("cors");
const connect = require("./src/utils/connect");
const { configCloudinary } = require("./src/api/middlewares/img.middleware");
const ActivityRoutes = require("./src/api/routes/activities.routes");
const CommentRoutes = require("./src/api/routes/comments.routes");
const FeedRoutes = require("./src/api/routes/feeds.routes");
const SectionRoutes = require("./src/api/routes/sections.routes");
const UserRoutes = require("./src/api/routes/users.routes");

configCloudinary();

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

app.use("/api/v1/activities", ActivityRoutes);
app.use("/api/v1/comments", CommentRoutes);
app.use("/api/v1/feeds", FeedRoutes);
app.use("/api/v1/sections", SectionRoutes);
app.use("/api/v1/users", UserRoutes);

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
