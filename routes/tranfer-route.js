const express = require('express')
const controller = require('../controllers/tranfer-controller')
const router = express.Router()
const { verifyToken } = require('../middlewares/user-middleware')


//------- GET -------//


//------- POST -------//
// ฟังกชันสักหรับโอนเหรียญไปให้บัญชีอื่น
router.post('/posttranfer', verifyToken, controller.tranfer_post)

//------- PUT -------//

//------- DELETE -------//

module.exports = router