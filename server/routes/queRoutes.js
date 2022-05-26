const express = require("express");
const { addQue,getAllque,getAllquewithSub,delAndUpdate } = require("../controllers/queController");
const router = express.Router();
// const {  } = require("../controllers/queController");
const {authenticateToken} =require("../helpers/authenticateToken")

router.post("/addque",authenticateToken, addQue);
router.get("/getallque/:email",authenticateToken, getAllque);
router.get("/getallquesub/:email/:subject",authenticateToken,getAllquewithSub);
router.put("/delandupdate/:email/:paperid",authenticateToken,delAndUpdate);

module.exports = router;