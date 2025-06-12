const db = require("../models");
const UserWallet = db.UserWallet
const Crypto = db.Crypto

//------- GET -------//
exports.userwallet_get_all_byuser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id

    const userwallet = await UserWallet.findAll({
      include: {
        model: Crypto,
        as: 'crypto',
        attributes: ['crypto_name']
      },
      where: {
        user_id: user_id
      },
      raw: true
    })    

    // crypto_balance_all เข้าไป
    const tran_userwallet = userwallet.map(item => ({
      ...item,
      crypto_balance: Number(item.crypto_balance).toFixed(2),
      crypto_balance_inorder: Number(item.crypto_balance_inorder).toFixed(2),
      crypto_balance_all: Number(item.crypto_balance + item.crypto_balance_inorder).toFixed(2),
    }));

    res.send({
      message: 'เรียกข้อมูล UserWallet ตาม User สำเร็จ',
      data: tran_userwallet
    });
  } catch (error) {
    console.log(error);
  }
}

//------- POST -------//


//------- PUT -------//


//------- DELETE -------//
