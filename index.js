require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});