const db = require("../models");
const UserWallet = db.UserWallet
const User = db.User
const Crypto = db.Crypto
const TranferOuter = db.TranferOuter

//------- GET -------//
exports.tranferouter_get_sender = async (req, res, next) => {
  try {
    const sender_id = req.params.sender_id

    const tranferoutersender = await TranferOuter.findAll({
      include: [{
        model: Crypto,
        as: 'crypto',
        attributes: ['crypto_name']
      },{
        model: User,
        as: 'user',
        attributes: ['user_name']
      }],
      where: {
        sender_id: sender_id
      },
      raw: true
    })    

    res.send({
      message: 'เรียกข้อมูล tranfer เหรียญไปนอกระบบของผู้ส่งสำเร็จ',
      data: tranferoutersender
    });
    
  } catch (error) {
    console.log(error);
  }
}

//------- POST -------//
exports.tranferouter_post = async (req, res, next) => {
  try {
    const { 
      sender_name,
      address,
      network,
      crypto_name,
      tranfer_amount,
      note,
    } = req.body

    const sender = await User.findOne({
      attributes: ['id'],
      where: {
        user_name: sender_name
      },
    })
    const crypto = await Crypto.findOne({
      attributes: ['id'],
      where: {
        crypto_name: crypto_name
      },
    })

    // เรียกข้อมูลบัญชีของผู้ให้และผู้รับเพื่อดูเหรียญในบัญชีก่อนหน้า
    const senderwallet = await UserWallet.findOne({
      where: {
        user_id: sender.id,
        crypto_id: crypto.id,
      },
    })

    // ดักไม่ให้โอนเหรียญเกินกว่าที่มี
    if (senderwallet.crypto_balance < tranfer_amount) {
      return res.send({
        message: 'เหรียญที่จะโอนเยอะเกินกว่าเหรียญที่มี'
      })
    }

    // ลดเหรียญจากบัญชีผู้ให้ตามจำนวนเงินที่โอน
    await UserWallet.update({
      crypto_balance: senderwallet.crypto_balance - tranfer_amount
    }, {
      where: {
        user_id: sender.id,
        crypto_id: crypto.id,
      },
    })

    await TranferOuter.create({
      sender_id: sender.id,
      address: address,
      network: network,
      crypto_id: crypto.id,
      tranfer_amount: tranfer_amount,
      note: note
    })

    res.send({
      message: 'โอนเงินให้บัญชีภายนอกระบบสำเร็จ'
    })
    
  } catch (error) {
    console.log(error);
  }
}

//------- PUT -------//


//------- DELETE -------//