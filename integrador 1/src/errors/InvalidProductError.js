export default class InvalidProductError extends Error{
    constructor(){
        super("invalid product");
        this.name = "InvalidProduct";
        this.status = 422;
    }
}
