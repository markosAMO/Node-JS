export default class AlreadyExistsError extends Error{
    constructor(){
        super("register already exists");
        this.name = "AlreadyExistsError";
        this.status = 422;
    }
}
