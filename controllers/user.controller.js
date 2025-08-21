const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password salah." });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "Login berhasil.",
            token: token,
        })
    } catch (error) {
        console.error("ERROR SAAT LOGIN:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

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
        const {search, sortBy, sortOrder} = req.query;
        let options = {
            attributes: { exclude: ['password'] },  
    }
    if (search) {
        options.where = {
            [Op.or]: [
                { fullname: { [Op.like]: `%${search}%` } },
                { username: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        };
    }
    if (sortBy) {
        const order = sortOrder && sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        options.order = [[sortBy, order]];
    }
    const users = await User.findAll(options);
        res.status(200).json(users);
    } catch (error) {
        console.error("ERROR SAAT GET ALL USERS:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

const getUserByUsername = async (req ,res) => {
    try {
        const {username} = req.params;
        const user = await User.findOne({
            where: { username },
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("ERROR SAAT GET USER BY USERNAME:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, username, email, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        user.fullname = fullname || user.fullname;
        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: "User berhasil diperbarui." });
    } catch (error) {
        console.error("ERROR SAAT UPDATE USER:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

const deleteUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        await user.destroy();
        res.status(200).json({ message: "User berhasil dihapus." });
    } catch (error) {
        console.error("ERROR SAAT DELETE USER:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

module.exports = {
    register,
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser,
    login
};