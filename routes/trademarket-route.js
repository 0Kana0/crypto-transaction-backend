const express = require('express')
const controller = require('../controllers/trademarket-controller')
const router = express.Router()
const { verifyToken } = require('../middlewares/user-middleware')

//------- GET -------//
// ข้อมูลเเสดงผู้ใช้งานที่มาตั้งซื้อ-ขาย crypto โดยกรองจาก type, crypto, currency
router.get('/gettrademarketbytypebycryptobycurrency/:type/:crypto/:currency', controller.trademarket_get_bytypebycryptobycurrency)

// ข้อมูลเเสดงผู้ใช้งานที่มาตั้งซื้อ-ขาย crypto โดยกรองจาก user
router.get('/gettrademarketbytypebycryptobycurrency/:user_id', verifyToken, controller.trademarket_get_byuser)

//------- POST -------//
// ตั้งการซื้อ-ขาย crypto
router.post('/posttrademarket', verifyToken, controller.trademarket_post)

//------- PUT -------//
// ยกเลิกการซื้อ-ขาย crypto
router.put('/puttrademarketcancel/:id', verifyToken, controller.trademarket_put_cancel)

//------- DELETE -------//

module.exports = router