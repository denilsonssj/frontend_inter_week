import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import md5 from 'crypto-js/md5';
import omit from 'lodash/omit';

import { User } from '../../entities/User';
import { UserSignIn } from "./dtos/user.signin.dto";
import { UserSignUp } from "./dtos/user.signup.dto";
import AppError from "../../shared/error/AppError";
import authConfig from '../../config/auth';


export default class UserService {

    async signin(user: UserSignIn) {
        const userRepository = getRepository(User);
        const { email, password } = user;
        const passwordHash = md5(password).toString();
        const existsUser = await userRepository.findOne({ where: { email, password: passwordHash }});
        if(!existsUser) {
            throw new AppError('User not found', 401);
        }
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({
            firstName: existsUser?.firstName,
            lastName: existsUser?.lastName,
            accountNumber: existsUser?.accountNumber,
            accountDigit: existsUser?.accountDigit,
            wallet: existsUser?.wallet,
        }, secret, {
            subject: existsUser?.id,
            expiresIn,
        });
        return { accessToken: token };
    }

    async signup(user: UserSignUp) {
        const userRepository = getRepository(User);
        const userExists = await userRepository.findOne({ where: { email: user.email } });
        if (userExists) {
            throw new AppError('User already exists', 400);
        }
        const passwordHash = md5(user.password).toString();
        const userData = userRepository.create({ 
            ...user,
            password : passwordHash,
            wallet: 0,
            accountNumber: Math.floor(Math.random() * 999999),
            accountDigit: Math.floor(Math.random() * 99),
        });
        const userCreated = await userRepository.save(userData);
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({
            firstName: user?.firstName,
            lastName: user?.lastName,
            accountNumber: userData?.accountNumber,
            accountDigit: userData?.accountDigit,
            wallet: userData?.wallet,
        }, secret, {
            subject: userData?.id,
            expiresIn,
        });
        return userCreated;
    }

    async list() {
        const userRepository = getRepository(User); 
        const users = await userRepository.find();
        return users;
    }

    async me(user: Partial<User>) {
        const userRepository = getRepository(User);
        const currentUser = await userRepository.findOne({ where: { id: user.id }});
        if (!currentUser) {
            throw new AppError('User not found', 401);
        }
        const newUser: Omit<User, 'password'> = omit(currentUser, 'password');
        return newUser;
    }

}