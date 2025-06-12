const express = require('express')
const controller = require('../controllers/tranferouter-controller')
const router = express.Router()
const { verifyToken } = require('../middlewares/user-middleware')

//------- GET -------//
// ฟังกชันเรียกดูข้อมูลการโอนเหรียญออกนอกระบบของฝั่งผู้ส่ง
router.get('/gettranferoutersender/:sender_id', verifyToken, controller.tranferouter_get_sender)

//------- POST -------//
// ฟังกชันสักหรับโอนเหรียญไปให้บัญชีอื่น
router.post('/posttranferouter', verifyToken, controller.tranferouter_post)

//------- PUT -------//

//------- DELETE -------//

module.exports = router