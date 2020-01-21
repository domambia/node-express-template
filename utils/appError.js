class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? '404' : '500'
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor);
    }
}