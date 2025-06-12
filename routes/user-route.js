const express = require('express')
const controller = require('../controllers/user-controller')
const router = express.Router()

//------- GET -------//

//------- POST -------//
// สมัครบัญชีใหม่
router.post('/register', controller.user_register)

// เข้าสู่ระบบจากบัญชีที่สมัคร
router.post('/login', controller.user_login)

//------- PUT -------//

//------- DELETE -------//

module.exports = router