const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userDetails = require("./routes/getdetails")
dotenv.config();

// database connection 
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("connected to database")
);

app.use(express.json());

app.use('/api/user', authRoute);
app.use("/api/post", postRoute);
app.use("/api/searchUser", userDetails);

app.listen(3000, () => console.log("Server is up and running"));