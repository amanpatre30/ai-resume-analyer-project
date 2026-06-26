const express = require("express");
const app = express();
const cors = require("cors");

const path = require("path");
require("./conn");

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);

const UserRoutes = require("./Routes/user");
const ResumeRoutes = require("./Routes/resume");

app.use("/api/user", UserRoutes);
app.use("/api/resume", ResumeRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on PORT ${PORT}`);
});
