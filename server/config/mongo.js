import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();
const CONN_STRING = process.env.ATLAS_CONN_STRING;
console.log(CONN_STRING);

let db;

async function connectToDb(cb) {
    try {
        const client = new MongoClient(CONN_STRING, { useUnifiedTopology: true } );
        await client.connect();

        db = client.db('thezalewskiproject');
        console.log('DB connected');
    } catch(e) {
        console.error(e);
    }
    cb();
}

export {
    db,
    connectToDb
};