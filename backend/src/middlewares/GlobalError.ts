import { Request, Response, NextFunction } from "express";

import AppError from "../shared/error/AppError";

function globalErrors(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (error instanceof AppError) {
        response.status(error.statusCode).send({
            status: 'error',
            statusCode: error.statusCode,
            message: error.message,
            data: error?.data,
        });
        next();
    }

    return response.status(500).send({
        status: 'error',
        statusCode: 500,
        message: 'Internal Server Error'
    });
}

export { globalErrors };