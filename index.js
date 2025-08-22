require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require('./config/db.config.js')

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);


const startServer = async () => {
    try {
      await db.authenticate();
      console.log('Database terhubung');
      await db.sync({});
      console.log('Sikronisasi database berhasil');

      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Gagal menghubungkan ke database:', error);
    }
}

startServer();