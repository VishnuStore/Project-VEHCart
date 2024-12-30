const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser');
app.use(express.json());
app.use(cookiesParser());
const products = require('./routes/products');
const User = require('./routes/auth');
const Admin = require('./routes/Admin');
const Order = require('./routes/order')
const Errorhandler = require('./middlewares/error');
app.use('/api/v1/',products);
app.use('/api/v1/',User);
app.use('/api/v1/',Admin)
app.use('/api/v1/',Order)
app.use(Errorhandler);
module.exports = app;