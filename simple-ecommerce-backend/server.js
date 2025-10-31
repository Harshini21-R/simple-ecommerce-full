const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// static frontend (simple)
app.use('/', express.static(__dirname + '/frontend'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
