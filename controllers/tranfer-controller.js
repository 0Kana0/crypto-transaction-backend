const db = require("../models");
const UserWallet = db.UserWallet
const User = db.User
const Crypto = db.Crypto
const Tranfer = db.Tranfer

//------- GET -------//
exports.tranfer_get_sender = async (req, res, next) => {
  try {
    const sender_id = req.params.sender_id

    const tranfersender = await Tranfer.findAll({
      include: [{
        model: Crypto,
        as: 'crypto',
        attributes: ['crypto_name']
      },{
        model: User,
        as: 'sender',
        attributes: ['user_name']
      },{
        model: User,
        as: 'recipient',
        attributes: ['user_name']
      }],
      where: {
        sender_id: sender_id
      },
      raw: true
    })    

    res.send({
      message: 'เรียกข้อมูล tranfer เหรียญไปบัญชีในระบบของผู้ส่งสำเร็จ',
      data: tranfersender
    });
  } catch (error) {
    console.log(error);
  }
}

exports.tranfer_get_recipient = async (req, res, next) => {
  try {
    const recipient_id = req.params.recipient_id

    const tranfersender = await Tranfer.findAll({
      include: [{
        model: Crypto,
        as: 'crypto',
        attributes: ['crypto_name']
      },{
        model: User,
        as: 'sender',
        attributes: ['user_name']
      },{
        model: User,
        as: 'recipient',
        attributes: ['user_name']
      }],
      where: {
        recipient_id: recipient_id
      },
      raw: true
    })    

    res.send({
      message: 'เรียกข้อมูล tranfer เหรียญไปบัญชีในระบบของผู้รับสำเร็จ',
      data: tranfersender
    });
  } catch (error) {
    console.log(error);
  }
}

//------- POST -------//
exports.tranfer_post = async (req, res, next) => {
  try {
    const { 
      sender_name,
      recipient_name,
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
    const recipient = await User.findOne({
      attributes: ['id'],
      where: {
        user_name: recipient_name
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
    const recipientwallet = await UserWallet.findOne({
      where: {
        user_id: recipient.id,
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
    // เพิ่มเหรียญจากบัญชีผู้รับตามจำนวนเงินที่โอน
    await UserWallet.update({
      crypto_balance: recipientwallet.crypto_balance + tranfer_amount
    }, {
      where: {
        user_id: recipient.id,
        crypto_id: crypto.id,
      },
    })

    await Tranfer.create({
      sender_id: sender.id,
      recipient_id: recipient.id,
      crypto_id: crypto.id,
      tranfer_amount: tranfer_amount,
      note: note
    })

    res.send({
      message: 'โอนเงินให้บัญชีอื่นสำเร็จ'
    })
    
  } catch (error) {
    console.log(error);
  }
}

//------- PUT -------//


//------- DELETE -------//