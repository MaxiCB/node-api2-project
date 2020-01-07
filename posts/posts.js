const express = require('express');

const router = express.Router();

const db = require("../data/db");

// Fetch all posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => res.send(posts))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});
// Fetch specific posts
router.get('/:id', (req, res) => {
  res.status(200).send('hello from the GET /posts/:id endpoint');
});
// Fetching posts comments
router.get('/:id/comments', (req, res) => {
  res.status(200).send('hello from the GET /posts/:id/comments endpoint');
});
// Add post
router.post('/', (req, res) => {
    res.status(200).send('hello from the POST /posts/ endpoint');
});
// Add comment to post
router.post('/:id/comments', (req, res) => {
    res.status(200).send('hello from the POST /posts/:id/comments endpoint');
});
// Updates a specific post
router.put('/:id', (req, res) => {
    res.status(200).send('hello from the PUT /posts/:id endpoint');
});
// Deletes a specific post
router.delete('/:id', (req, res) => {
    res.status(200).send('hello from the DELETE /posts/:id endpoint');
});

module.exports = router;