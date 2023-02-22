import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Technical } from './entity/Technical'
import { Support } from './entity/Support'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '',
    port: 5432,
    database: 'pruebatecdb',
    entities: [User, Technical, Support],
    logging: true,
    synchronize: true
})