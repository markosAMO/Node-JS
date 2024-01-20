export default class NotFoundError extends Error{
    constructor(){
        super("register not found");
        this.name = "NotFoundError";
        this.status = 404;
    }
}
