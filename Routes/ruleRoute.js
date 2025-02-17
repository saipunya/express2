const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/rule', async (req, res) => {
    try {
        // ใช้ req.query เพื่อรับค่าจาก URL
        const { keyword } = req.query;

        // ถ้าไม่มี keyword ส่งผลลัพธ์ทั้งหมด (สามารถกำหนดค่า default ได้)
        if (!keyword) {
            return res.render('rule', {
                user: req.session.user || '',
                data: [] // ถ้าไม่มี keyword ส่งข้อมูลว่าง
            });
        }

        // ใช้ SQL Query กับ LIKE และ OR
        const sql = `SELECT * FROM tbl_laws WHERE law_detail LIKE ? OR law_detail LIKE ? ORDER BY law_number ASC`;
        const values = [`%${keyword}%`, `%${keyword}%`];

        // ดึงข้อมูลจากฐานข้อมูล
        const [result] = await connection.promise().query(sql, values);

        // ส่งข้อมูลไปยัง view
        res.render('rule', {
            data: result, // ส่งผลลัพธ์ที่ค้นหามา
            user: req.session.user || '', // ส่งข้อมูลผู้ใช้
        });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
