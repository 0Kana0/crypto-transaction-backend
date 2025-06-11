const express = require('express')
const controller = require('../controllers/trademarket-controller')
const router = express.Router()

//------- GET -------//
router.get('/gettrademarket', controller.trademarket_get_all)

//------- POST -------//
router.post('/posttrademarket', controller.trademarket_post)

//------- PUT -------//

//------- DELETE -------//

module.exports = router