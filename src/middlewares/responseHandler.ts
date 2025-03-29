import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Response {
            success(data: any, message?: string, statusCode?: number): void;
            error(message: any, statusCode?: number): void;
            notFound(message?: any, statusCode?: number): void;
            unAuthorized(message?: any, statusCode?: number): void;
            forbidden(message?: any, statusCode?: number): void;
            conflict(message?: any, statusCode?: number): void;
            badRequest(message?: any, statusCode?: number): void;
            internalServerError(message?: any, statusCode?: number): void;
            validationError(message?: any, statusCode?: number): void;
        }
    }
}

export const responseHandler = (_req: Request, res: Response, next: NextFunction) => {
    
    res.success = (data: any, message: string = 'Success', statusCode: number = 200) => {
        return res.status(statusCode).json({
            status: 'success',
            code: statusCode,
            message,
            data,
        });
    };

    res.error = (message: string, statusCode: number = 400, errors?: any) => {
        const response: any = {
            status: 'error',
            code: statusCode,
            message,
        };

        if (errors) {
            response.errors = errors;
        }

        return res.status(statusCode).json(response);
    };

    res.notFound = (message: string = 'Not Found', statusCode: number = 404) => {
        return res.status(statusCode).json({
            status: 'notfound',
            code: statusCode,
            message,
        });
    };

    res.unAuthorized = (message: string = 'Unauthorized', statusCode: number = 401) => {
        return res.status(statusCode).json({
            status: 'unauthorized',
            code: statusCode,
            message,
        });
    };

    res.forbidden = (message: string = 'Forbidden', statusCode: number = 403) => {
        return res.status(statusCode).json({
            status: 'forbidden',
            code: statusCode,
            message,
        });
    };

    res.conflict = (message: string = 'Conflict', statusCode: number = 409) => {
        return res.status(statusCode).json({
            status: 'conflict',
            code: statusCode,
            message,
        });
    };

    res.badRequest = (message: string = 'Bad Request', statusCode: number = 400) => {
        return res.status(statusCode).json({
            status: 'badrequest',
            code: statusCode,
            message,
        });
    };

    res.internalServerError = (message: string = 'Internal Server Error', statusCode: number = 500) => {
        return res.status(statusCode).json({
            status: 'error',
            code: statusCode,
            message,
        });
    };

    res.validationError = (message: string = 'Validation Error', statusCode: number = 422) => {
        return res.status(statusCode).json({
            status: 'validationerror',
            code: statusCode,
            message,
        });
    };

    next();
};