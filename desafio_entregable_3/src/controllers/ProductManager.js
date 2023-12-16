const AlreadyExistsError = require('../errors/AlreadyExistsError.js');
const Product = require('../models/Product.js');
const NotFoundError = require('../errors/NotFoundError.js');
const fs = require('node:fs');

module.exports = class ProductManager{
    constructor(){
        this.path = '../desafio_entregable_2/docs/products.txt';
        console.log(this.products)

        this.max_id = 1;
    }

    loadFromFile(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (!data.trim()) {
              this.products = [];
            } else {
                this.products = JSON.parse(data);
            }
          } catch (error) {
            console.error('Error reading or parsing products file:', error.message);
            this.products = [];
          }
    }

    isValidProduct(product){
        const expected_keys = ["id", "title", "description", "price", "thumbnail", "code", "stock"]
        const keys = Object.keys(product)
        return expected_keys.every((expected_key) => {
            return (keys.includes(expected_key) && product[expected_key])
        })
    }

    addProduct(title, description, price, thumbnail, code, stock){
        this.loadFromFile();
        console.log(this.products);
        let product = new Product(this.max_id, title, description, price, thumbnail, code, stock);
        if(!this.products.find(p => p.code === code) && this.isValidProduct(product)){
            this.products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(this.products))
            this.max_id++;
        }else
            throw new AlreadyExistsError()
    }

    findById(id){
        this.loadFromFile();
        let element = this.products.find(p => p.id === id)
        if(!element){
            throw new NotFoundError();
        }else
            return element
    }

    deleteProduct(id){
        this.loadFromFile();
        let index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("eliminado correctamente");
        }else
            throw new NotFoundError();
    }

    getProducts(){
        this.loadFromFile();
        return [...this.products];
    }

}


