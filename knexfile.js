module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {

            host: '127.0.0.1',

            user: 'root',
            password: 'GoOwls!23',

            database: 'local-alfred-database',
            charset: 'utf8',

        }

    }

};