const bcrypt = require("bcrypt");
const User = require('../models/user.model.js');

const register = async (req, res) => {
    console.log("Mencoba registrasi dengan data:", req.body);

    try {
        const { fullname, username, email, password } = req.body;
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ message: "Semua field (fullname, username, email, password) harus diisi." });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            username,
            email,
            password: hashPassword
        });
        return res.status(201).json({
            message: 'User berhasil ditambahkan'
        });

    } catch (error) {

        console.error("ERROR SAAT REGISTRASI:", error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(409).json({
                message: `Gagal membuat user. ${field} sudah terdaftar.`
            });
        }

        return res.status(500).json({
            message: `Terjadi kesalahan internal pada server.`,
            error: error.message 
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("ERROR SAAT GET ALL USERS:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
};

module.exports = {
    register,
    getAllUsers 
};