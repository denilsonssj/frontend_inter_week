import { getRepository } from "typeorm";

import { Pix } from "../../entities/Pix";
import { User } from "../../entities/User";
import AppError from "../../shared/error/AppError";
import { decodeKey, encodeKey } from "../../utils/pix";

export default class PixService {

    async request(value: number, user: Partial<User>) {
        const pixRepository = getRepository(Pix);
        const userRepository = getRepository(User);
        const currentUser = await userRepository.findOne({ where: { id: user.id } });
        const requestData = {
            requestingUser: currentUser,
            value,
            status: 'open',
        };
        const requestDataToSave = pixRepository.create(requestData);
        const register = await pixRepository.save(requestDataToSave);
        const key = encodeKey(user.id || '', value, register.id);
        return key;
    }

    async pay(key: string, user: Partial<User>) {
        const keyDecoded = decodeKey(key);
        if (keyDecoded.userId === user.id) {
            throw new AppError('Not possible to receive the pix from same user', 401);
        }
        const pixRepository = getRepository(Pix);
        const userRepository = getRepository(User);
        const requestingUser = await userRepository.findOne({ where: { id: keyDecoded.userId }});
        const payingUser = await userRepository.findOne({ where: { id: user.id }});
        if (!requestingUser || !payingUser) {
            throw new AppError('Não encontramos os clientes da transação, gere uma nova chave', 401);
        }
        if (payingUser.wallet < Number(keyDecoded.value)) {
            throw new AppError('Não há saldo suficiente para fazer o pagamento', 401);
        }
        requestingUser.wallet = Number(requestingUser?.wallet) + Number(keyDecoded.value);
        await userRepository.save(requestingUser);

        payingUser.wallet = Number(payingUser?.wallet) - Number(keyDecoded.value);
        await userRepository.save(payingUser);

        const pixTransaction = await pixRepository.findOne({
            where: {
                id: keyDecoded.registerId,
                status: 'open',
            }
        });
        if (!pixTransaction) {
            throw new AppError('Chave inválida por pagamento', 401);
        }

        pixTransaction.status = 'close';
        pixTransaction.payingUser = payingUser;

        await pixRepository.save(pixTransaction);

        return { message: 'Pagamento realizado com sucesso!' };
    }

    async transactions(user: Partial<User>) {
        const pixRepository = getRepository(Pix);
        const pixReceived = await (await pixRepository.find({
            where: {
                requestingUser: user.id,
                status: 'close',
            },
            relations: ['payingUser'],
        }));
        const pixPaying = await pixRepository.find({
            where: {
                payingUser: user.id,
                status: 'close',
            },
            relations: ['requestingUser'],
        });
        const received = pixReceived.map(transaction => ({
            value: transaction.value,
            user: {
                firstName: transaction.payingUser.firstName,
                lastName: transaction.payingUser.lastName,
            },
            updatedAt: transaction.updatedAt,
            type: 'received',
        }));
        const paying = pixPaying.map(transaction => ({
            value: transaction.value,
            user: {
                firstName: transaction.requestingUser.firstName,
                lastName: transaction.requestingUser.lastName,
            },
            updatedAt: transaction.updatedAt,
            type: 'paid',
        }));
        const alltransactions = received.concat(paying);
        alltransactions.sort(function(a, b) {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();
            return dateA < dateB ? 1 : -1;
        });
        return alltransactions;
    }

}