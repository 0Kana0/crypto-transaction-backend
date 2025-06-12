const db = require("../models");
const UserWallet = db.UserWallet
const TradeMarket = db.TradeMarket
const Crypto = db.Crypto
const User = db.User
const Currency = db.Currency

//------- GET -------//
exports.trademarket_get_bytypebycryptobycurrency = async (req, res, next) => {
  try {
    const trade_type = req.params.type
    const crypto_name = req.params.crypto
    const currency_name = req.params.currency

    const crypto = await Crypto.findOne({
      attributes: ['id'],
      where: {
        crypto_name: crypto_name
      },
    })
    const currency = await Currency.findOne({
      attributes: ['id'],
      where: {
        currency_name: currency_name
      },
    })

    const trademarket = await TradeMarket.findAll({
      include: [{
        model: Crypto,
        as: 'crypto',
        attributes: ['crypto_name']
      },
      { 
        model: User,
        as: 'user',
        attributes: ['user_name']
      },
      { 
        model: Currency,
        as: 'currency',
        attributes: ['currency_name']
      }],
      where: {
        trade_status: 'Pending',
        crypto_id: crypto.id,
        currency_id: currency.id,
        trade_type: trade_type
      },
      raw: true
    })    

    // ปรับทศนิยมตามเว็บ
    const tran_trademarket = trademarket.map(item => ({
      ...item,
      price: Number(item.price).toFixed(3), 
      available: Number(item.available).toFixed(2),
      min_trade: Number(item.min_trade).toFixed(2),
      max_trade: Number(item.price*item.available).toFixed(2), 
    }));
    
    res.send({
      message: 'เรียกข้อมูล TradeMarket จาก type, crypto, currency สำเร็จ',
      data: tran_trademarket
    });
  } catch (error) {
    console.log(error);
  }
}

exports.trademarket_get_byuser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id

    const trademarket = await TradeMarket.findAll({
      include: [{
        model: Crypto,
        as: 'crypto',
        attributes: ['crypto_name']
      },
      { 
        model: User,
        as: 'user',
        attributes: ['user_name']
      },
      { 
        model: Currency,
        as: 'currency',
        attributes: ['currency_name']
      }],
      where: {
        user_id: user_id,
      },
      raw: true
    })   

    // ปรับทศนิยมตามเว็บ
    const tran_trademarket = trademarket.map(item => ({
      ...item,
      price: Number(item.price).toFixed(3), 
      available: Number(item.available).toFixed(2),
      min_trade: Number(item.min_trade).toFixed(2),
      max_trade: Number(item.price*item.available).toFixed(2), 
    }));
    
    res.send({
      message: 'เรียกข้อมูล TradeMarket ตาม user สำเร็จ',
      data: tran_trademarket
    })

  } catch (error) {
    console.log(error);
  }
}


//------- POST -------//
exports.trademarket_post = async (req, res, next) => {
  try {
    const { 
      user_name, 
      crypto_name,
      currency_name,
      price,
      available,
      min_trade,
      payment,
      trade_type,
    } = req.body

    const user = await User.findOne({
      attributes: ['id'],
      where: {
        user_name: user_name
      },
    })
    const crypto = await Crypto.findOne({
      attributes: ['id'],
      where: {
        crypto_name: crypto_name
      },
    })
    const currency = await Currency.findOne({
      attributes: ['id'],
      where: {
        currency_name: currency_name
      },
    })

    // เรียกข้อมูล userwallet เพื่อนำมาเเก้ไขจำนวนเหรียญ
    const userwallet = await UserWallet.findOne({
      attributes: ['crypto_balance', 'crypto_balance_inorder'],
      where: {
        user_id: user.id,
        crypto_id: crypto.id
      },
    }) 
    // ถ้ากดลงขายเหรียญเกินกว่าเหรียญที่มีอยู่
    if (userwallet.crypto_balance - available < 0 && trade_type == "Buy") {
      return res.send({
        message: 'เหรียญที่จะขายเกินกว่าเหรียญที่สามารถใช้ได้ โปรดลองใหม่อีกครั้ง'
      })
    }

    await TradeMarket.create({
      user_id: user.id,
      crypto_id: crypto.id,
      currency_id: currency.id,
      price: price,
      available: available,
      min_trade: min_trade,
      payment: payment,
      trade_type: trade_type
    })

    // เมื่อตั้งขายเหรียญให้นำจำนวนเหรียญที่ลงขายมาลบกับจำนวนเหรียญที่ใช้ได้และบวกกับจำนวนเหรียญที่ลงขายอยู่
    if (trade_type == "Buy") {
      await UserWallet.update({
        crypto_balance: userwallet.crypto_balance - available,
        crypto_balance_inorder: userwallet.crypto_balance_inorder + available
      },{
        where: {
          user_id: user.id,
          crypto_id: crypto.id
      }})
    }

    res.send({
      message: 'ตั้งซื้อขายเหรียญสำเร็จ'
    })
  } catch (error) {
    console.log(error);
  }
}

//------- PUT -------//
exports.trademarket_put_cancel = async (req, res, next) => {
  try {
    const id = req.params.id

    // เรียกข้อมูล tradeMarket, userwallet เพื่อนำมาเเก้ไขจำนวนเหรียญ
    const tradeMarket = await TradeMarket.findOne({
      attributes: ['user_id', 'crypto_id', 'trade_type', 'available'],
      where: {
        id: id
      },
    })
    const userwallet = await UserWallet.findOne({
      attributes: ['crypto_balance', 'crypto_balance_inorder'],
      where: {
        user_id: tradeMarket.user_id,
        crypto_id: tradeMarket.crypto_id
      },
    }) 

    await TradeMarket.update({
      trade_status: 'Cancel'
    },{
      where: {
        id: id
    }})

    // ถ้ารายการที่ยกเลิกเป็นตั้งขาย ให้นำจำนวนเหรียญที่ลงขายบวกกับจำนวนเหรียญที่ใช้ได้และลบกับจำนวนเหรียญที่ลงขายอยู่
    if (tradeMarket.trade_type == "Buy") {
      await UserWallet.update({
        crypto_balance: userwallet.crypto_balance + tradeMarket.available,
        crypto_balance_inorder: userwallet.crypto_balance_inorder - tradeMarket.available
      },{
        where: {
          user_id: tradeMarket.user_id,
          crypto_id: tradeMarket.crypto_id
        },
      })
    }

    res.send({
      message: 'ยกเลิกการซื้อขายเหรียญสำเร็จ'
    })
  } catch (error) {
    console.log(error);
  }
}

//------- DELETE -------//
