export class ApiResponse{
    constructor(message, success,body){
        this.message = message,
        this.success = success,
        this.body = body;
    }
}