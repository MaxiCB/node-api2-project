const express = require("express");

const router = express.Router();

const db = require("../data/db");

router.use(express.json());

// Fetch all posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => res.send(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});
// Fetch specific posts
router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
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
router.get("/:id/comments", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
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
router.post("/", (req, res) => {
  const post = req.body;
  const { title, contents } = post;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(post)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  }
});
// Add comment to post
router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  const { text, post_id } = comment;
  console.log(comment);
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.findById(req.params.id);
    db.insertComment(req.body)
      .then(result => {
        db.findCommentById(result.id)
          .then(found => {
            res.status(200).json(found);
          })
          .catch(err => {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
          });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});
// Updates a specific post
router.put("/:id", (req, res) => {
  const post = req.body;
  const { id, title, contents } = post;
  console.log(post);
  if (id && title && contents) {
    db.findById(post.id)
      .then(foundDoc => {
        // Process the update here
        db.update(id, post)
          .then(result => {
            res.status(200).json(post);
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The post information could not be modified." })
          );
      })
      .catch(err => {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  } else {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title, id, and contents for the post."
      });
  }
});
// Deletes a specific post
router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(temp => {
      db.findById(req.params.id).then(post => {
        if (!post) {
          res.status(200);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      });
    })
    .catch(err =>
      res.status(400).json({ error: "The post could not be removed" })
    );
});

module.exports = router;
