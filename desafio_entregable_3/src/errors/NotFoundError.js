module.exports = class NotFoundError extends Error{
    constructor(){
        super("register not found");
        this.name = "NotFoundError";
    }
}
