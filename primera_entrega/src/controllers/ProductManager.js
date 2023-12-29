import AlreadyExistsError from '../errors/AlreadyExistsError.js';
import NotFoundError from '../errors/NotFoundError.js';
import fs from 'fs'

export default class ProductManager{
    constructor(path){
        this.path = path;

        this.getMaxId();
    }

    async getMaxId(){
        await this.loadFromFile();
        let max = 1;
        this.products.forEach(p => {
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
        const expected_keys = ["id", "title", "description", "price", "code", "stock"]
        const keys = Object.keys(product)
        return expected_keys.every((expected_key) => {
            return (keys.includes(expected_key) && product[expected_key])
        })
    }

    async addProduct(product){
        await this.loadFromFile();
        product.id = this.max_id+1;
        if(!this.products.find(p => p.code === product.code) && this.isValidProduct(product)){
            this.products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return product;
        }else
            throw new AlreadyExistsError()
    }

    async findById(id){
        await this.loadFromFile();
        let element = this.products.find(p => p.id === id)
        if(!element){
            throw new NotFoundError();
        }else
            return element;
    }

    async deleteProduct(id){
        await this.loadFromFile();
        let index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log("eliminado correctamente");
        }else
            throw new NotFoundError();
    }

    async modifyProduct(id, producto){
        await this.loadFromFile();
        await this.findById(id); //comprobar que existe el producto
        producto.id = id;
        if(this.isValidProduct(producto)){
            let index = this.products.findIndex(product => product.id === id);
            this.products[index] = producto;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return producto;
        }
    }

    async getProducts(limit){
        await this.loadFromFile();
        if(limit){
            return this.products.slice(0, limit);
        }
        return [...this.products];
    }
}


