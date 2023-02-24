import express from 'express';
import expressBasicAuth from 'express-basic-auth';
import cors from 'cors';
import path from 'path';
import { db, connectToDb } from '../config/mongo.js';
import { ObjectId } from 'mongodb';
import ensureToken from '../method.js';
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

import  { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageLength = 15;

let corsOptions = {
    origin: "http://localhost:3000"
};

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

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

// GET CALLS
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get("/api/deaths/surname/:surname", async (req, res) => {
    const { surname } = req.params;

    const records = await db.collection('milwaukeedeaths').find(
        { surname: surname },
        { sort: { date: 1 }}
    ).toArray();

    const total = await db.collection('milwaukeedeaths').count(
        { surname: surname }
    )
    // console.log(records);
    res.status(200).json({records: records, total: total});
});

app.get("/api/deaths/search/:term/:page?", async (req, res) => {
    const { term, page } = req.params;
    console.log(req.params);
    let offset = 0;
    if(page && page > 0) {
        offset = pageLength * (page - 1);
    }

    const records = await db.collection('milwaukeedeaths').find(
        { $or: [ { surname: new RegExp(term, 'i') }, { givenames: new RegExp(term, 'i') } ] },
        { 
            sort: { date: 1 },
            limit: pageLength,
            skip: offset
        }
    ).toArray();

    const total = await db.collection('milwaukeedeaths').count(
        { $or: [ { surname: new RegExp(term, 'i') }, { givenames: new RegExp(term, 'i') } ] }
    )
    // console.log(records);
    res.status(200).json({records: records, total: total});
    
});

app.get("/api/deaths/date/:sdate/:page?", async (req, res) => {
    const { sdate } = req.params;
    const page = req.params.page;
    let offset = 0;
    if(page && page > 0) {
        offset = pageLength * (page - 1);
    }
 
    const records = await db.collection('milwaukeedeaths').find(
        { date: new RegExp('^'+sdate) },
        { 
            sort: { date: 1, surname: 1 },
            limit: pageLength,
            skip: offset
        }
    ).toArray();

    const total = await db.collection('milwaukeedeaths').count(
        { date: new RegExp('^'+sdate) }
    )
    // console.log(records);
    res.status(200).json({records: records, total: total});

});

app.get("/api/deaths/hasBurial/:page?", async (req, res) => {
    const page = req.params.page;
    let offset = 0;
    if(page && page > 0) {
        offset = pageLength * (page - 1);
    }

    const records = await db.collection('milwaukeedeaths').find(
        { $or: [
            { cemeteriesorg: { $nin: [ null, '' ] } },
            { billiongraves: { $nin: [ null, '' ] } },
            { findagrave: { $nin: [ null, '' ] } },
        ] },
        { 
            sort: { date: 1, surname: 1 },
            limit: pageLength,
            skip: offset
        }
    ).toArray();

    const total = await db.collection('milwaukeedeaths').count(
        { $or: [
            { cemeteriesorg: { $nin: [ null, '' ] } },
            { billiongraves: { $nin: [ null, '' ] } },
            { findagrave: { $nin: [ null, '' ] } },
        ] },
    )
    // console.log(records);
    res.status(200).json({records: records, total: total});

});

app.get("/api/deaths/getYears", async (req, res) => {

    const records = await db.collection('milwaukeedeaths').aggregate( 
    [
        {
          '$project': {
            _id: 0,
            'year': {
              '$substrBytes': [
                '$date', 0, 4
              ]
            }
          }
        },
        {
            $group: { _id: "$year" }
        },
        {
            $sort: { _id: 1 }
        }
      ]).toArray();

    const total = records.length;

    res.status(200).json({records: records, total: total});
});

app.get("/api/deaths/all", async (req, res) => {
    const records = await db.collection('milwaukeedeaths').find(
        {}, { sort: { date: 1, surname: 1 }}
    ).toArray();
    const total = records.length;

    res.status(200).json({records: records, total: total});
});

app.get("/api/deaths/count/:year?", async (req, res) => {
    const year = req.params.year;

    let filter = {};
    let total = [];
    if(year) {
        if(year === 'all') {
            const pretotal = await db.collection('milwaukeedeaths_stats').aggregate(
            [
                {
                    $addFields: {
                    obj: { k: "$year", v: "$count" },
                    },
                },
                {
                    $group: {
                    _id: "$year",
                    items: { $push: "$obj" },
                    },
                },
                {
                    $project: {
                    items2: {
                        $concatArrays: [
                        [{ k: "_id", v: "$_id" }],
                        "$items",
                        ],
                    },
                    },
                },
                { $sort: { _id: 1 } },
                { $replaceWith: { $arrayToObject: "$items2" } },
                {
                    $project: {
                    _id: 0
                    }
                }
            ]).toArray();
            let totObj = {};
            pretotal.forEach((element, index) => {
                let yearkey = '';
                Object.keys(element).forEach(key => {
                    yearkey = key;
                });
                totObj[yearkey] = element[yearkey];
            });
            total.push(totObj);
        } else {
            filter['date'] = new RegExp('^'+year);
            total = await db.collection('milwaukeedeaths').count(filter);
        }
        // console.log(total);
    } else {
        total = await db.collection('milwaukeedeaths').count();
    }

    res.status(200).json(total);
});

app.get("/api/deaths/:page?", async (req, res) => {
    const page = req.params.page;
    const sort = req.query.sort;
    let offset = 0;
    if(page && page > 0) {
        offset = pageLength * (page - 1);
    }

    let sortData = { date: 1, surname: 1, givennames: 1 };
    if(sort) {
        sortData = {};
        sortData[sort] = 1;
        if(req.query.direction) {
            sortData[sort] = req.query.direction;
        }
        if(sort != 'date') {
            sortData['date'] = 1;
        }
    }
    // console.log(sortData);

    const records = await db.collection('milwaukeedeaths').find(
        {}, { 
            sort: sortData,
            limit: pageLength,
            skip: offset
        }
    ).toArray();
    const total = await db.collection('milwaukeedeaths').count();

    res.send({records: records, total: total});
});

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

// SERVER
const PORT = process.env.PORT || 8018;
connectToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
