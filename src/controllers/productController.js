// controllers/productController.js
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }
    res.status(200).send(product);
};

exports.deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted' });
};