const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {authenticateToken} = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:username', userController.getUserByUsername);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:username', authenticateToken, userController.deleteUser);
router.get('/verify-email', userController.verifyEmail);
router.post('/upload', authenticateToken, upload.single('profileImage'), userController.uploadProfilePicture);

module.exports = router;