const express = require('express')
const router = express.Router();
const user = require('../Controller/User')
const middleware = require('../Middleware/Middle')

router.post('/', user.signUp)
router.post('/login', user.login)
router.get('/profile', middleware,user.profile)

module.exports = router;