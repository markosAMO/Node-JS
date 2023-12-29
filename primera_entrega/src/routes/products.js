import express from 'express';
import ProductManager from '../controllers/ProductManager.js';
const router = express.Router();
let path = '../primera_entrega/docs/products.json';
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

router.put('/:id', async (req, res) =>{
    const productId = parseInt(req.params.id);
    try{
        let modifiedProduct = await pm.modifyProduct(productId, req.body);
        res.jsonp({"message": "success",
                   "product": modifiedProduct});
    }catch(error){
        console.error(error);
        if (error.name === 'NotFoundError') {
            res.status(404).send('Product not found');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

router.post('/', async (req, res) =>{
    try {
        let product = await pm.addProduct(req.body);
        res.json({"message": "success",
                  "product": product});
    } catch (error) {
        if (error.name === 'AlreadyExistsError'){
            res.status(404).send({"error": error.message})
        }else{
            if (error.name === 'NotFoundError') {
                res.status(404).send({"error": error.message});
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
});

router.delete('/:id', async (req, res) =>{
    const productId = parseInt(req.params.id);

    try {
        pm.deleteProduct(productId);
        res.json({"message": "success"});
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
