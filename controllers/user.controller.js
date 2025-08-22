const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require('../services/email.service.js');
const { v4: uuidv4 } = require('uuid');


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
        const verificationToken = uuidv4();
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            username,
            email,
            password: hashPassword,
            verificationToken:verificationToken,
            isVerified: false
        });
        sendVerificationEmail(newUser.email, newUser.fullname, verificationToken);
        return res.status(201).json({
            message: 'User berhasil ditambahkan, cek email untuk verifikasi.'
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


const verifyEmail = async (req,res) => {
    try {
        const { token } = req.query;
        if(!token) {
            return res.status(400).json({ message: "Token verifikasi tidak ditemukan." });
        }
        const user = await User.findOne({ where: { verificationToken: token } });
        if (!user) {
            return res.status(404).json({ message: "Token verifikasi tidak valid." });
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        res.status(200).json('<h1>Verifikasi email berhasil!</h1><p>Anda sekarang bisa login ke aplikasi.</p>')
    } catch (error) {
        console.error("ERROR SAAT VERIFIKASI EMAIL:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Tidak ada file yang diunggah." });
        }
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan." });
    }
    const filePath = req.file.path;
    user.profile_image_url = filePath;
    await user.save();

    res.status(200).json({
        message: "Foto profil berhasil diunggah.",
        filePath: filePath
    })
    }catch (error) {
        console.error("ERROR SAAT UPLOAD PROFILE PICTURE:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
}

module.exports = {
    register,
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser,
    login,
    verifyEmail,
    uploadProfilePicture
};