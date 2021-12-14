import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../shared/error/AppError';
import authConfig from '../config/auth';

interface ITokenPayload {
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
    sub: string;
}

export default function userAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('Não foi possível enviar o JWT', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub, firstName, lastName } = decoded as ITokenPayload;
        request.user = {
            id: sub,
            firstName,
            lastName,
        };
        return next();
    }
    catch {
        throw new AppError('token JWT inválido', 401);
    }

}
