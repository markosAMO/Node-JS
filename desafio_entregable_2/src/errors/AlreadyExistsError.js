module.exports = class AlreadyExistsError extends Error{
    constructor(){
        super("register already exists");
        this.name = "AlreadyExistsError";
    }
}
