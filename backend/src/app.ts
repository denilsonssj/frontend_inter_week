import express from 'express';
import "reflect-metadata";
import 'express-async-errors';
import "dotenv/config";
import cors from 'cors';

import { connection } from './database/connection';
import routes from './routes';
import { globalErrors } from './middlewares/GlobalError';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    originSuccessStatus: 200,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);
app.use(globalErrors);

const port = process.env.SERVER_PORT;

export { app, port, connection };
