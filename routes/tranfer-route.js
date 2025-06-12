const express = require('express')
const controller = require('../controllers/tranfer-controller')
const router = express.Router()
const { verifyToken } = require('../middlewares/user-middleware')

//------- GET -------//
// ฟังกชันเรียกดูข้อมูลการโอนเหรียญในระบบของฝั่งผู้ส่ง
router.get('/gettranfersender/:sender_id', verifyToken, controller.tranfer_get_sender)

// ฟังกชันเรียกดูข้อมูลการโอนเหรียญในระบบของฝั่งผู้รับ
router.get('/gettranferrecipient/:recipient_id', verifyToken, controller.tranfer_get_recipient)

//------- POST -------//
// ฟังกชันสักหรับโอนเหรียญไปให้บัญชีอื่น
router.post('/posttranfer', verifyToken, controller.tranfer_post)

//------- PUT -------//

//------- DELETE -------//

module.exports = router