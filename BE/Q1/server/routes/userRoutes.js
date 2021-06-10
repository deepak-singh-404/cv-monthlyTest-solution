const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multer')


const { userRegister, userLogin, userProfile
} = require('../controllers/userController')

router.post('/register', upload.single('profilePicture'), userRegister)

router.post('/login', userLogin)

router.get('/profile',passport.authenticate('jwt', { session: false }),userProfile)


module.exports = router