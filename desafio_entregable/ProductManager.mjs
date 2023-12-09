import AlreadyExistsError from './AlreadyExistsError.mjs';
import Product from './Product.mjs'
import NotFoundError from './NotFoundError.mjs'
class ProductManager{
    constructor(){
        this.products = [];
        this.max_id = 1;
    }

    isValidProduct(product){
        const expected_keys = ["id", "title", "description", "price", "thumbnail", "code", "stock"]
        const keys = Object.keys(product)
        return expected_keys.every((expected_key) => {
            return (keys.includes(expected_key) && product[expected_key])
        })
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let product = new Product(this.max_id, title, description, price, thumbnail, code, stock);
        if(!this.products.find(p => p.code === code) && this.isValidProduct(product)){
            this.products.push(product);
            this.max_id++;
        }else
            throw new AlreadyExistsError()
    }

    findById(id){
        let element = this.products.find(p => p.id === id)
        if(!element){
            throw new NotFoundError();
        }else
            return element
    }

    getProducts(){
        return [...this.products];
    }

}

export default ProductManager;


