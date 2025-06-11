const db = require("../models");
const UserWallet = db.UserWallet
const TradeMarket = db.TradeMarket

//------- GET -------//
exports.trademarket_get_all = async (req, res, next) => {
  try {
    const trademarket = await TradeMarket.findAll()    
    res.send({
      message: 'Get TradeMarket Success',
      data: trademarket
    });
  } catch (error) {
    console.log(error);
  }
}

//------- POST -------//
exports.trademarket_post = async (req, res, next) => {
  try {
    const { 
      userwallet_id,
      user_id, 
      crypto_id,
      currency_id,
      price,
      available,
      min_trade,
      max_trade,
      payment,
      trade_type,
    } = req.body

    const userwallet = await UserWallet.findOne({
      attributes: ['crypto_balance'],
      where: {
        id: userwallet_id
      },
    }) 
    if (userwallet.crypto_balance - available < 0 && trade_type == "Buy") {
      return res.send({
        message: 'เหรียญที่จะขายเกินกว่าเหรียญที่สามารถใช้ได้ โปรดลองใหม่อีกครั้ง'
      })
    }

    await TradeMarket.create({
      userwallet_id: userwallet_id,
      user_id: user_id,
      crypto_id: crypto_id,
      currency_id: currency_id,
      price: price,
      available: available,
      min_trade: min_trade,
      max_trade: max_trade,
      payment: payment,
      trade_type: trade_type
    })

    if (trade_type == "Buy") {
      await UserWallet.update({
        crypto_balance: userwallet.crypto_balance - available,
        crypto_balance_inorder: available
      },{
        where: {
          id: userwallet_id
      }})
    }

    res.send({
      message: 'บันทึก TradeMarket สำเร็จ'
    })
  } catch (error) {
    console.log(error);
  }
}

//------- PUT -------//


//------- DELETE -------//
