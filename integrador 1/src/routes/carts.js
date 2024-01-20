import express from 'express';
import CartManager from '../controllers/CartManager.js';
import CartProduct from '../models/CartProduct.js';
const router = express.Router();
let path = '../primera_entrega/docs/cart.json';
let cm = new CartManager(path);

router.post('/', async (req, res) =>{
    try {
        cm.addCart();
        res.json({"response": "succsess"});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:cid/product/:pid', async (req, res) =>{
    try {
        const productId = parseInt(req.params.pid);
        const cartId = parseInt(req.params.cid);
        let cp = new CartProduct(productId, 1);
        await cm.addProductToCart(cartId, cp);
        res.json({"response": "succsess"});
    } catch (error) {
        console.log(error);
        console.log(error.status);
        console.log("====");
        if(error.name === 'InternalServerError'){
            res.status(500).send('Internal Server Error');
        }else{
            res.status(error.status).send({"error": error.name});
        }
    }
});

router.get('/:cid', async (req, res) => {
    try{
        const cartId = parseInt(req.params.cid);
        let products = await cm.showCartProducts(cartId);
        res.json(products);
    }catch (error) {
        if(error.name === 'InternalServerError'){
            res.status(500).send('Internal Server Error');
        }else
            res.status(error.status).send({"error":error.name});
    }
});

export default router;

