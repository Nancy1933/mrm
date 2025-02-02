const express = require("express");
const controller = require("../controllers/test.controller");
const router = express.Router();

router.get("/all", controller.allAccess);
module.exports = router;