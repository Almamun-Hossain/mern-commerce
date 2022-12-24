const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./src/config/database");



//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

dotenv.config({ path: "./src/config/config.env" });

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening on http:://localhost:${process.env.PORT}!`
  );
});

//Unhandled Promise Exception
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled exception");

  server.close(() => {
    process.exit(1);
  });
});
