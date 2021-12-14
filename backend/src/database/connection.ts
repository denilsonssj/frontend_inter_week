import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { resolve } from "path";

import {
    DATABASE_NAME,
    DATABASE_TYPE,
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE
} from '../config/environment/env';

const connectionOptions: ConnectionOptions = {
    name: DATABASE_NAME,
    type: DATABASE_TYPE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: false,
    entities: [
      resolve(__dirname, '..', 'entities', '*.ts'),
    ],
    "migrations": [
      resolve(__dirname, 'migrations', '*.ts'), 
    ],
    "subscribers": [
      resolve('..', 'subscribers', '*.ts')
    ]
} as ConnectionOptions;

const connection: Promise<Connection> = createConnection(connectionOptions);

export { connection };
