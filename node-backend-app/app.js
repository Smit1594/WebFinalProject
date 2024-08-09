const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require("path");
const ProductSchema = require('./models/product_model');
const CartSchema = require('./models/cart_model');
const CategorySchema = require('./models/category_model');
const UserSchema = require('./models/user_model');

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
    .then(() => console.log('MongoDB connected Successfully...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/product', async (req, res) => {
    try {
        const products = await ProductSchema.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        res.status(200).send(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post('/product', async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        if (!name || !description || !price || !category || !stock || !imageUrl) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newProduct = new ProductSchema({ name, description, price, category, stock, imageUrl });

        const addedProduct = await newProduct.save();
        res.status(200).json(addedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

app.put('/product/:id', async (req, res) => {
    try {
        const { name, description, price, category} = req.body;

        if (!name || !description || !price || !category ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newProduct = await ProductSchema.findByIdAndUpdate(req.params.id, req.body);
        if (!newProduct) return res.status(404).json({ error: 'Product Not Found..!!' });
        res.status(200).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

app.delete('/product/:id', async (req, res) => { 
    try {
        const product = await ProductSchema.findOneAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product Not Found..!!' });
        res.status(200).send({ error: 'Product Deleted Successfully..!!' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get('/category', async (req, res) => {
    try {
        const categories = await CategorySchema.find();
        res.status(200).send(categories);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get('/category/:id', async (req, res) => {
    try {
        const category = await CategorySchema.findById(req.params.id);
        res.status(200).send(category);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post('/category', async (req, res) => {
    try {
        const { name, description} = req.body;

        if (!name || !description ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newCategory = new CategorySchema({ name, description });

        const addedCategory = await newCategory.save();
        res.status(200).json(addedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

app.put('/category/:id', async (req, res) => {
    try {
        const { name, description} = req.body;

        if (!name || !description ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newCategory = await CategorySchema.findByIdAndUpdate(req.params.id, req.body);
        if (!newCategory) return res.status(404).json({ error: 'Category Not Found..!!' });
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.delete('/category/:id', async (req, res) => { 
    try {
        const category = await CategorySchema.findOneAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category Not Found..!!' });
        res.status(200).send({ error: 'Category Deleted Successfully..!!' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get('/cart', async (req, res) => {
    try {
        const carts = await CartSchema.find().populate('product_id');
        res.status(200).send(carts);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post('/cart', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        let cartData = await CartSchema.findOne({ product_id });

        if (cartData) {
            cartData.quantity += quantity;
        } else {
            cartData = new CartSchema({ user_id: user_id, product_id: product_id, quantity: quantity });
        }
        const newCart = await cartData.save();
        res.status(200).json(newCart);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.delete('/cart/:id', async (req, res) => { 
    try {
        const cart = await CartSchema.findOneAndDelete(req.params.id);
        if (!cart) return res.status(404).json({ error: 'Cart Not Found..!!' });
        res.status(200).send({ error: 'Cart Deleted Successfully..!!' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post('/user', async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newUser = new UserSchema({ username, password });

        const addedUser = await newUser.save();
        res.status(200).json(addedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

app.get('/login', async (req, res) => {
    const { username, password } = req.query;
    try {
        const user = await UserSchema.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: 'Login successful', data: user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Listen Server on Specific PORT
const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});