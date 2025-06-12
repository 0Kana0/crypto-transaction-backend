const express = require('express')
const controller = require('../controllers/userwallet-controller')
const router = express.Router()
const { verifyToken } = require('../middlewares/user-middleware')


//------- GET -------//
// ข้อมูลจำนวนเหรียญ crypto เเต่ละเหรียญของผู้ใช้งาน
router.get('/getuserwalletbyuser/:user_id', verifyToken, controller.userwallet_get_all_byuser)

//------- POST -------//

//------- PUT -------//

//------- DELETE -------//

module.exports = router