เปิดโฟลเดอร์ว่างใช้คำสั่ง git clone https://github.com/0Kana0/crypto-transaction-backend.git
cd เข้าโฟสเดอร์ crypto-transaction-backend
รันคำสัง npm install
สร้าง database โดยตั้งชื่อ crypto_transaction_db ใช้ mysql แล้วทำการ config ตามเครื่องของเเต่ละคน
รันคำสั่ง npx sequelize-cli db:migrate เพื่อสร้าง table สำหรับเก็บข้อมูล
รันคำสั่ง npx sequelize-cli db:seed:all เพื่อเพิ่มข้อมูลที่เก็บไว้ใน seed ลงใน table
