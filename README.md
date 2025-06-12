เปิดโฟลเดอร์ว่างใช้คำสั่ง git clone https://github.com/0Kana0/crypto-transaction-backend.git
cd เข้าโฟสเดอร์ crypto-transaction-backend
รันคำสัง npm install
สร้าง database โดยตั้งชื่อ crypto_transaction_db ใช้ mysql แล้วทำการ config ตามเครื่องของเเต่ละคน
รันคำสั่ง npx sequelize-cli db:migrate เพื่อสร้าง table สำหรับเก็บข้อมูล
รันคำสั่ง npx sequelize-cli db:seed:all เพื่อเพิ่มข้อมูลที่เก็บไว้ใน seed ลงใน table
ระบบสมัครสมาชิกและกระเป๋าเก็บเหรียญทั้ง 4 เหรียญ
ระบบสามารถตั้งซื่อขายเหรียญ crypto ใน table trademarket โดยจะเลือกตั้งซื้อหรือต้ั่งขายก้ได้
สามารถเข้าไปซื่อขายเหรียญกับคนที่ตั้งซื่อขายเหรียญได้ใน table tradetransaction 
โอนเหรียญไปให้บัญชีอื่นหรือนอกระบบได้
