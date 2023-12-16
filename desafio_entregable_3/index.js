const ProductManager = require('./src/controllers/ProductManager.js'); 
const pm = new ProductManager();

try{
    pm.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
}catch(e){
    console.log(e);
}
console.log(pm.getProducts());

try{
    pm.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
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
    pm.addProduct("producto prueba", "Este es un producto prueba", 1, "sin imagen", "abcd123", 25);
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

