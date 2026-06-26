const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Missing MONGODB_URI environment variable.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
    process.exit(1);
  });

// amanpatre321_db_user

// BCk9PDrKUZFt1GRG

// mongodb+srv://amanpatre321_db_user:BCk9PDrKUZFt1GRG@cluster0.fnmnpll.mongodb.net/?appName=Cluster0
