import { Request, Response } from 'express';

import PixService from './pix.service';

export default class PixController {

    async request(request: Request, response: Response) {
        const pixService = new PixService();
        const { value } = request.body;
        const { user } = request;
        const requestKey = await pixService.request(+value, user);
        return response.status(200).send({ copyPasteKey: requestKey });
    }

    async pay(request: Request, response: Response) {
        const pixService = new PixService();
        const { key } = request.params;
        const { user } = request;
        const payment = await pixService.pay(key, user);
        return response.status(201).send(payment);
    }

    async transactions(request: Request, response: Response) {
        const pixService = new PixService();
        const { user } = request;
        const transactions = await pixService.transactions(user);
        return response.status(201).send({ transactions });
    }

}
