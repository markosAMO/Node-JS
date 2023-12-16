const ProductManager = require('./src/controllers/ProductManager.js');
path = '../desafio_entregable_2/docs/products.txt'
const pm = new ProductManager(path);
const Product = require('./src/models/Product.js');

try{
    let product = new Product(null, "producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
    pm.addProduct(product);
}catch(e){
    console.log(e);
}
console.log(pm.getProducts());

try{
    let product = new Product(null, "producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
    pm.addProduct(product);
}catch(e){
    console.log(e);
}

try{
    console.log(pm.findById(1));
}catch(e){
    console.log(e);
}

try{
    console.log(pm.findById(3));
}catch(e){
    console.log(e);
}

try{
    let product = new Product(null, "producto prueba", "Este es un producto prueba", 1, "sin imagen", "abcd123", 25);
    pm.addProduct(product);
    console.log('producto creado');
}catch(e){
    console.log(e);
}

console.log("=====================");

try{
    pm.deleteProduct(1);
}catch(e){
    console.log(e);
}

/*
try{
    pm.deleteProduct(50);
}catch(e){
    console.log(e);
}
*/

