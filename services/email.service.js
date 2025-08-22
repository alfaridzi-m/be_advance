const tranporter = require('../config/mailer.config');

const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
    try {
        const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
        const mailOptions = {
            from: `"Be Advance" <no-reply@aplikasianjay.com>`,
            to: userEmail,
            subject: 'Verifikasi Akun Anda',
            html : `
            <div>
                <h1>Halo ${userName},</h1>
                <p>Terima kasih telah mendaftar di Be Advance. Untuk mengaktifkan akun Anda, silakan klik tautan berikut:</p>
                <a href="${verificationLink}">Verifikasi Akun</a>
                <p>Jika Anda tidak mendaftar, abaikan email ini.</p>
                <p>Salam,</p>
                <p>Tim Be Advance</p>
            </div>
            `
        };
        await tranporter.sendMail(mailOptions);
        console.log(`Email verifikasi berhasil dikirim ke ${userEmail}`);
       } catch (error) {
        console.error(`gagal mengirim email verifikasi ke ${userEmail}:`, error);
       }

}

module.exports = {
    sendVerificationEmail};