const express = require('express');

const router = express.Router();

const db = require("../data/db");

router.use(express.json())

// Fetch all posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => res.send(posts))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});
// Fetch specific posts
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
      .then(post => {
          if(post){
            res.status(200).json(post);
          } else {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
          }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
});
// Fetching posts comments
router.get('/:id/comments', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        if(post){
          res.status(200).json(post);
        } else {
          res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
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
    db.remove(req.params.id)
    .then(temp => {
        db.findById(req.params.id)
      .then(post => {
          if(!post){
            res.status(200);
          } else {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
          }
      })
    })
    .catch(err => res.status(400).json({ error: "The post could not be removed"}))
});

module.exports = router;