import { Request, Response } from 'express';

import UserService from './user.service';

export class UserController {

    async signin(request: Request, response: Response) {
        const { email, password } = request.body;
        const userService: UserService = new UserService();
        const user = await userService.signin({ email, password });
        return response.status(200).json(user);
    }

    async signup(request: Request, response: Response) {
        const { firstName, lastName, email, password } = request.body;
        const userService: UserService = new UserService();
        const user = await userService.signup({ 
            firstName,
            lastName,
            email,
            password
        });
        return response.status(201).json(user);
    }

    async list(request: Request, response: Response) {
        const userService: UserService = new UserService();
        const users = await userService.list();
        return response.status(200).json(users);
    }

    async me(request: Request, response: Response) {
        const userService = new UserService();
        const user = await userService.me(request.user);
        return response.status(201).json(user);
    }

}