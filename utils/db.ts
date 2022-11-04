import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'warriors_game',
    namedPlaceholders: true,
    decimalNumbers: true,
});