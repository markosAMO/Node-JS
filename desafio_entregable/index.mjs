import ProductManager from './ProductManager.mjs';

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
