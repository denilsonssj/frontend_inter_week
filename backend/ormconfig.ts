const { resolve } = require('path');

module.exports = {
    cli: {
        migrationsDir: 'src/database/migrations',
    },
    migrations: [
        'src/database/migrations',
    ],
    entities: [
        'src/entities/*.ts',
    ],
};