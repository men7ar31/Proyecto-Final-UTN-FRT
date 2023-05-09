const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
      {
        _id: 1,
        name: "task-one",
        description: "lorem ipsum",
        date: "2023-04-21",
      },
      {
        _id: 2,
        name: "task-two",
        description: "lorem ipsum",
        date: "2023-04-21",
      },
    ]);
  });
  
module.exports = router;
