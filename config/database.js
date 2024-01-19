// import mysql
const mysql = require("mysql");

// import dotenv
require("dotenv").config();

// destructuring env
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// create connection
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

// export connection
module.exports = db;
