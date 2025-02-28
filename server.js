require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // รองรับ JSON
app.use(express.urlencoded({ extended: true })); // รองรับ Form Data

// เชื่อมต่อ MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'calendar_db'
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err);
    } else {
        console.log('✅ MySQL Connected...');
    }
});

// เรียก API ที่ Root
app.get('/', (req, res) => {
    res.send('🎉 Calendar API is running...');
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
