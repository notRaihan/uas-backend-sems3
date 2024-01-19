// import express
const express = require("express");
const app = express();

// import routes
const apiRoutes = require("./routes/api");

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api", apiRoutes);

// listen to port
const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
