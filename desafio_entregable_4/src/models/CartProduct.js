export default class CartProduct{
    constructor(id, quantity){
        this.quantity = quantity;
        this.id_prod = id;
    }
    
    incementQuantity(){
        this.quantity++;
    }

    decreaseQuantity(){
        this.quantity--;
    }
}
