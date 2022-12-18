require("dotenv").config();
const http = require("http");
const express = require("express");
const app = require("./app");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");

const server = http.createServer(app);

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
