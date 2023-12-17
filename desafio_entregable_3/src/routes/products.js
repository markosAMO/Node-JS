import express from 'express';
import ProductManager from '../controllers/ProductManager.js';
const router = express.Router();
let path = '../desafio_entregable_3/docs/products.txt';
let pm = new ProductManager(path);

router.get('/', async (req, res) =>{
    try {
        const limit = parseInt(req.query.limit) || null;
        const products = await pm.getProducts(limit);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) =>{
    const productId = parseInt(req.params.id);

    try {
        const product = await pm.findById(productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        if (error.name === 'NotFoundError') {
            res.status(404).send('Product not found');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

export default router;
