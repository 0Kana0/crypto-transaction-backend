const db = require("../models");
const TradeTransaction = db.TradeTransaction
const TradeMarket = db.TradeMarket
const UserWallet = db.UserWallet
const User = db.User

//------- GET -------//


//------- POST -------//
exports.tradetransaction_post = async (req, res, next) => {
  try {
    const { 
      trademarket_id,
      customer_name,
      fiat_amount,
      crypto_amount,
      bank_number,
    } = req.body

    const customer = await User.findOne({
      attributes: ['id'],
      where: {
        user_name: customer_name
      },
    })

    // เรียกข้อมูล trademarket เพื่อใช้ในการบันทัก transaction
    const trademarket = await TradeMarket.findOne({
      where: {
        id: trademarket_id
      },
    })    

    let fiat_amount_cal
    let crypto_amount_cal
    // ถ้าเป็นการตั้งขายเหรียญจะใส่เพียง fiat_amount เข้ามา หาค่าเหรียญจากสูตร
    if (trademarket.trade_type == "Buy") {
      fiat_amount_cal = fiat_amount
      crypto_amount_cal = fiat_amount/trademarket.price
    // ถ้าเป็นการตั้งซื้อเหรียญจะใส่เพียง crypto_amount เข้ามา หาค่าเหรียญจากสูตร
    } else if (trademarket.trade_type == "Sell") {
      fiat_amount_cal = crypto_amount*trademarket.price
      crypto_amount_cal = crypto_amount
    }

    // ถ้า fiat ที่ใส่เข้ามาหรือ fiat ที่คำนวนได้น้อยกว่า fiat ต่ำสุดที่ตั้งไว้
    if (fiat_amount_cal < trademarket.min_trade) {
      return res.send({
        message: 'fiat_amount น้อยเกินไป',
      });
      // ถ้า fiat ที่ใส่เข้ามาหรือ fiat ที่คำนวนได้น้อยกว่า fiat สูงสุดที่ตั้งไว้
    } else if (fiat_amount_cal > trademarket.price*trademarket.available) {
      return res.send({
        message: 'fiat_amount มากเกินไป',
      });
    }

    await TradeTransaction.create({
      trademarket_id: trademarket_id,
      trader_id: trademarket.user_id,
      customer_id: customer.id,
      crypto_id: trademarket.crypto_id,
      currency_id: trademarket.currency_id,
      price: trademarket.price,
      fiat_amount: fiat_amount_cal,
      crypto_amount: crypto_amount_cal,
      bank_number: bank_number,
      trade_type: trademarket.trade_type
    })

    res.send({
      message: 'ส่งขอธุรกรรมซือขายเหรียญสำเร็จ'
    })
  } catch (error) {
    console.log(error);
  }
}

//------- PUT -------//
exports.tradetransaction_put_confirm = async (req, res, next) => {
  try {
    const id = req.params.id

    const tradetransaction = await TradeTransaction.findOne({
      include: [{
        model: TradeMarket,
        as: 'trademarket',
      }],
      where: {
        id: id
      },
      raw: true
    })
    
    // เรียกข้อมูล wallet ของผู้ตั้งซื้อขายเพื่อเตรียมเพิ่มลดเหรียญ
    const traderwallet = await UserWallet.findOne({
      where: {
        user_id: tradetransaction.trader_id,
        crypto_id: tradetransaction.crypto_id
      },
    })   
    // เรียกข้อมูล wallet ของผู้ขอทำธุรกรรมเพื่อเตรียมเพิ่มลดเหรียญ
    const customerwallet = await UserWallet.findOne({
      where: {
        user_id: tradetransaction.customer_id,
        crypto_id: tradetransaction.crypto_id
      },
    })  

    // ถ้าเป็นการตั้งขายเหรียญ
    if (tradetransaction.trade_type == "Buy") {

      // เหรียญในรายการตั้งขายลดลงเนื่องจากถูกซื้อโดยผู้ขอทำธุรกรรมนำ fiat มาเเลก
      await TradeMarket.update({
        available: tradetransaction['trademarket.available'] - tradetransaction.crypto_amount
      }, {
        where: {
          id: tradetransaction.trademarket_id,
        },
      })
      if (tradetransaction['trademarket.available'] - tradetransaction.crypto_amount == 0) {
        await TradeMarket.update({
          trade_status: "Complete"
        }, {
          where: {
            id: tradetransaction.trademarket_id,
          },
        })
      }
      
      // เหรียญในส่วนของการขายของผู้ตั้งขายลดลงเนื่องจากผู้ขอทำธุรกรรมนำ fiat มาเเลกกับเหรียญ
      await UserWallet.update({
        crypto_balance_inorder: traderwallet.crypto_balance_inorder - tradetransaction.crypto_amount
      }, {
        where: {
          user_id: tradetransaction.trader_id,
          crypto_id: tradetransaction.crypto_id
        },
      })

      // เหรียญของผู้ขอทำธุรกรรมเพิ่มขึ้นเนื่องจากนำ fiat มาเเลกกับเหรียญของผู้ตั้งขาย
      await UserWallet.update({
        crypto_balance: customerwallet.crypto_balance + tradetransaction.crypto_amount
      }, {
        where: {
          user_id: tradetransaction.customer_id,
          crypto_id: tradetransaction.crypto_id
        },
      })

    // ถ้าเป็นการตั้งซื้อเหรียญ
    } else if (tradetransaction.trade_type == "Sell") {

      // เหรียญที่ต้องการซื้อลดลงเนื่องจากผู้ขอทำธุรกรรมขายเหรีญให้ เหรียญเข้าไปเก็บในกระเป๋า ทำให้เหรียญที่ต้องการซื้อลดลง
      await TradeMarket.update({
        available: tradetransaction['trademarket.available'] - tradetransaction.crypto_amount
      }, {
        where: {
          id: tradetransaction.trademarket_id,
        },
      })
      if (tradetransaction['trademarket.available'] - tradetransaction.crypto_amount == 0) {
        await TradeMarket.update({
          trade_status: "Complete"
        }, {
          where: {
            id: tradetransaction.trademarket_id,
          },
        })
      }
      
      // เหรียญของผู้ตั้งซื้อเพิ่มขึ้นเนื่องจากนำ fiat มาเเลกกับเหรียญของผู้ขอทำธุรกรรม
      await UserWallet.update({
        crypto_balance: traderwallet.crypto_balance + tradetransaction.crypto_amount
      }, {
        where: {
          user_id: tradetransaction.trader_id,
          crypto_id: tradetransaction.crypto_id
        },
      })

      // เหรียญของผู้ขอทำธุรกรรมลดลงเนื่องจากขายเหรียญไปให้ผู้ตั้งซื้อโดยได้ fiat กลับมา
      await UserWallet.update({
        crypto_balance: customerwallet.crypto_balance - tradetransaction.crypto_amount
      }, {
        where: {
          user_id: tradetransaction.customer_id,
          crypto_id: tradetransaction.crypto_id
        },
      })

    }

    await TradeTransaction.update({
      transaction_status: "Complete"
    }, {
      where: {
        id: id
      },
    })

    res.send({
      message: 'ทำการซือขายเหรียญสำเร็จ'
    })

  } catch (error) {
    console.log(error);
  }
}

exports.tradetransaction_put_cancel = async (req, res, next) => {
  try {
    const id = req.params.id

    await TradeTransaction.update({
      transaction_status: "Cancel"
    }, {
      where: {
        id: id
      },
    })

    res.send({
      message: 'ยกเลิกธุรกรรมซือขายเหรียญสำเร็จ'
    })
  } catch (error) {
    console.log(error);
  }
}

//------- DELETE -------//
