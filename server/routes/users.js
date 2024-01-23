// USER_ROUTER
const express = require('express'); 
const router = express.Router(); 

const { createUser, loginUser } = require('../controller/userController');

//sign up route
router.post("/create", createUser );

//login route
router.post("/login", loginUser)


module.exports = router;