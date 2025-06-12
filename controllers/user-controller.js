const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.User
const Crypto = db.Crypto
const UserWallet = db.UserWallet

//------- GET -------//

//------- POST -------//
exports.user_register = async (req, res, next) => {
  try {
    const { 
      user_name,
      email, 
      password,
      confirm_password,
    } = req.body

    // ดึงเหรียญทั้งหมดออกมา
    const crypto = await Crypto.findAll({
      attributes: ['id'],
      order: [['id', 'ASC']],
      raw: true
    }) 

    // ตรวจสอบว่า email นี้ใช้งานไปหรือยัง
    const checkUser = await User.findOne({
      attributes: ['email'],
      where: {
        email: email
      },
      raw: true
    }) 
    if (checkUser) {
      return res.send({
        message: 'มีบัญชีนี้อยู่ในระบบแล้ว'
      })
    }
    if (password !== confirm_password) {
      return res.send({
        message: 'ยืนยันรหัสผ่านไม่ตรงกัน'
      })
    }

    // hash password เพื่อความปลอดภัย
    const hashPassword =  await bcrypt.hash(password, 10)

    const userresult = await User.create({
      user_name: user_name,
      email: email,
      password: hashPassword,
    })

    // เพิ่มเหรีญทั้งหมดไปยัง wallet ของบัญชีนี้
    for (const item of crypto) {
      await UserWallet.create({
        user_id: userresult.id,
        crypto_id: item.id,
      })
    }

    res.send({
      message: 'สร้างบัญชีสำเร็จ'
    })
  } catch (error) {
    console.log(error);
  }
}

exports.user_login = async (req, res, next) => {
  try {
    const { 
      email, 
      password,
    } = req.body

    // ตรวจสอบว่า email นี้สมัครใช้งานหรือไม่
    const checkUser = await User.findOne({
      where: {
        email: email
      },
      raw: true
    }) 

    // ถ้า email และ password ถูกต้อง ให้สร้าง token เพื่อไปใช้ยันยืนกับบาง api
    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
      const token = jwt.sign(
        {
          id: checkUser.id,
          user_name: checkUser.user_name,
          email
        },
        process.env.TOKEN_KEY
      )

      checkUser.token = token
      res.send({
        message: 'เข้าสู่ระบบสำเร็จ',
        data: checkUser,
      })
    } else {
      res.send({
        message: 'เข้าสู่ระบบไม่สำเร็จ'
      })
    }

  } catch (error) {
    console.log(error);
  }
}

//------- PUT -------//


//------- DELETE -------//
