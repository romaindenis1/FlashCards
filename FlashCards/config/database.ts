import Env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = {
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST', '127.0.0.1'),
        port: Env.get('DB_PORT', 3306),
        user: Env.get('DB_USER', 'root'),
        password: Env.get('DB_PASSWORD', 'root'),
        database: Env.get('DB_DATABASE', 'flashcards'),
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
