const express = require('express');

const postRoutes = require("./posts/posts");

const server = express();
server.use(express.json())

// server.use('/', (req, res) => res.send('API up and running!'));

server.use("/posts", postRoutes)

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));