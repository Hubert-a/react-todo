const express = require('express')
const {loginUser, signupUser} = require('../Controllers/userController')

const router = express.Router()

//Login route
router.post("/login", loginUser)


//signup route
router.post("/signup", signupUser)



module.exports = router