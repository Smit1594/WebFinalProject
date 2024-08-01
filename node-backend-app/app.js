const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require("path");
const ProductModel = require('./model');

const url = 'mongodb+srv://smittt9415:i47gfsyUUyiwjhPk@webtechnology.vioqbny.mongodb.net/?retryWrites=true&w=majority&appName=WebTechnology';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Accept-Language, Accept-Encoding');
    next();
  });

mongoose.connect(url)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/product', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/product', async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        if (!name || !description || !price || !category || !stock || !imageUrl) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newProduct = new ProductModel({ name, description, price, category, stock, imageUrl });

        const addedProduct = await newProduct.save();
        res.status(200).json(addedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// Listen Server on Specific PORT
const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});