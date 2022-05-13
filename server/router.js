const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`server is running at port number 8000`);
});

module.exports = router;
