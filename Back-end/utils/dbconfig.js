import pgPromise from 'pg-promise';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
import { DATABASE_URL } from './config';

dotenv.config();

const pgp = pgPromise({ promiseLib: bluebird });
const db = pgp(DATABASE_URL);

export default db;
