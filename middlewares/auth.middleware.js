const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Anda tidak punya akses ini" });
    }
    jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token tidak valid" });
        }
        req.user = user;
        next();
    });
};

module.exports = {authenticateToken};