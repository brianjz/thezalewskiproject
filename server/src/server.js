import express from 'express';
import expressBasicAuth from 'express-basic-auth';
// import cors from 'cors';
import path from 'path';
import { ObjectId } from 'mongodb';
import ensureToken from '../method.js';
import { db, connectToDb } from '../config/mongo.js';

import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

import  { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// Route Handlers 
import mdRouter from '../routes/milwaukeedeaths.js';
import censusRouter from '../routes/census.js';
app.use('/api/deaths', mdRouter);
app.use('/api/census', censusRouter);

// --- Authentication ---
app.post('/api/auth/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).end();
        return;
      }
      const correctPW = expressBasicAuth.safeCompare(process.env.BPW, password);
      if (username !== process.env.BUSER || !correctPW) {
        res.status(400).json({ msg: 'Invalid Email Or Password' });
        return;
      }
      const token = sign({
        id: username,
      },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      res.status(200).json({ token });
    } catch (err) {
        console.log('POST auth/signin, Something Went Wrong: ', err);
        res.status(400).send({ error: true, message: err.message });
    }
})

app.get('/api/auth/me', async (req, res) => {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
        const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
        
        const decoded = verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
        res.status(400).json(defaultReturnObject);
        return;
        }
        res.status(200).json({ authenticated: true, user: decoded.id });
    }
    catch (err) {
        console.log('POST auth/me, Something Went Wrong', err);
        res.status(400).json(defaultReturnObject);
    }
})

app.get(/^(?!\/api).+/, (req, res) => {
    console.log('Default');
    res.sendFile(path.join(__dirname, '../public/index.html'));
    // res.sendFile(path.join(__dirname, '../../client/public/index.html')); //DEV
})

app.post('/api/record/add', ensureToken, async (req, res) => {
    const record = req.body;

    const newRecord = await db.collection('milwaukeedeaths').insertOne(record);

    res.send(newRecord);
});

app.post('/api/record/edit/:recId', ensureToken, async (req, res) => {
    const record = req.body;
    const { recId } = req.params;
    // console.log(record);

    try {
        const newRecord = await db.collection('milwaukeedeaths').updateOne(
            { _id: new ObjectId(recId) },
            {
                $set: {
                    'date': record.date,
                    'title': record.title,
                    'givennames': record.givennames,
                    'surname': record.surname,
                    'maidenname': record.maidenname,
                    'paper': record.paper,
                    'type': record.type,
                    'age': record.age,
                    'address': record.address,
                    'notes': record.notes,
                    'sites': {
                        'findagrave': record.sites.findagrave,
                        'wikitree': record.sites.wikitree,
                        'cemeteriesorg': record.sites.cemeteriesorg,
                        'billiongraves': record.sites.billiongraves,
                    }
                }
            }
        );
    } catch(e) {
        res.send({updated: false, error: e.message})
    }

    res.send({updated: true});
});

app.get('/api/record/:id', async (req, res) => {
    const id = req.params.id;
    const record = await db.collection('milwaukeedeaths').findOne({'_id': new ObjectId(id)});
    res.send({record: record});
});


// --- SERVER ---
const PORT = process.env.PORT || 8018;
connectToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
