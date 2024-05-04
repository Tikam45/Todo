// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Import Controller
const {login, signUp} = require("./controllers/auth")
const {verifytoken} = require("./middleware/verification")


mongoose.connect('mongodb://127.0.0.1:27017/taskManager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mapping Create
app.post("/register" , signUp);
app.post("/login" , login);
app.get("/tasks", getTasks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
