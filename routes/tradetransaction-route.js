const express = require('express')
const controller = require('../controllers/tradetransaction-controller')
const router = express.Router()
const { verifyToken } = require('../middlewares/user-middleware')

//------- GET -------//
// ฟังกชันสำหรับเรียกข้อมูลการทำธุรกรรมของผู้ลงซื้อขายเหรียญ
router.get('/gettradetransactiontrader/:trader_id', verifyToken, controller.tradetransaction_get_trader)
// ฟังกชันสำหรับเรียกข้อมูลการทำธุรกรรมของคนที่มาซื้อขายด้วย
router.get('/gettradetransactioncustomer/:customer_id', verifyToken, controller.tradetransaction_get_customer)

//------- POST -------//
// ฟังกชันสำหรับการทำธุรกรรมกับคนที่ตั้งซื้อขายเหรียญไว้
router.post('/posttradetransaction', verifyToken, controller.tradetransaction_post)

//------- PUT -------//
// ฟังกชั้นสำหรับการยืนยันว่าจะโอนเหรียญหรือ fiat ให้กับคนที่ตั้งซื้อขายเหรียญ
router.put('/puttradetransactionconfirm/:id', verifyToken, controller.tradetransaction_put_confirm)

// ฟังกชันสำหรับยกเลิกการทำธุรกรรมกับคนที่ตั้งซื้อขายเหรียญ
router.put('/puttradetransactioncancel/:id', verifyToken, controller.tradetransaction_put_cancel)

//------- DELETE -------//

module.exports = router