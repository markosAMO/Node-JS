export default class Cart{
    constructor(id){
        this.products = [];
        this.id = id;
    }
    
    addProduct(p){
        this.products.push(p);
    }

    removeProduct(id){
        this.products = this.products.filter(product => id !== product.id);
    }
}
