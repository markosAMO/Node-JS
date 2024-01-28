import InvalidProduct from '../errors/InvalidProductError.js';
import NotFoundError from '../errors/NotFoundError.js';
import Cart from '../models/Cart.js';
import fs from 'fs'

export default class CartManager{
    constructor(path){
        this.path = path;

        this.getMaxId();
    }

    async getMaxId(){
        await this.loadFromFile();
        let max = 1;
        this.carts.forEach(p => {
            if(p.id > max){
                max = p.id;
            }
        });
        this.max_id = max;
    }

    async loadFromFile(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            if (!data.trim()) {
              this.carts = [];
            } else {
                this.carts = JSON.parse(data);
            }
          } catch (error) {
            console.error('Error reading or parsing products file:', error.message);
            this.carts = [];
          }
    }

    async addCart(){
        await this.loadFromFile();
        let cart = new Cart(this.max_id+1);
        this.carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        return cart;
    }

    async showCartProducts(id){
        await this.loadFromFile();
        let cart = await this.findCartById(id);
        return cart.products;
    }

    async addProductToCart(id, p){
        await this.loadFromFile();
        let cart = await this.findCartById(id);
        let cartProduct = cart.products.find(prod => prod.id_prod === p.id_prod);
        console.log(cartProduct);
        if(cartProduct){
            cartProduct.quantity++;
        }else
            cart.products.push(p);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    }

    async findCartById(id){
        await this.loadFromFile();
        let cart = this.carts.find(c => c.id === id);
        if(!cart){
            throw new NotFoundError;
        }else
            return cart;        
    }

    validateProduct(p){
        if(!p.id_prod || !p.quantity){
            throw new InvalidProduct();
        }
    }
}
