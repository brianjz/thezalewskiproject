import express from 'express';
import { db } from '../config/mongo.js';
const mdRouter = express.Router();

const pageLength = 15;

// --- MILWAUKEE DEATH INDEX ---
mdRouter.get("/surname/:surname", async (req, res) => {
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

mdRouter.get("/search/:term/:page?", async (req, res) => {
    const { term, page } = req.params;
    // console.log(req.params);
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

mdRouter.get("/date/:year(\\d+)/:page(\\d+)?", async (req, res) => {
    const { year, page } = req.params;
    let offset = 0;
    if(page && page > 0) {
        offset = pageLength * (page - 1);
    }
 
    const records = await db.collection('milwaukeedeaths').find(
        { date: new RegExp('^'+year) },
        { 
            sort: { date: 1, surname: 1 },
            limit: pageLength,
            skip: offset
        }
    ).toArray();

    const total = await db.collection('milwaukeedeaths').count(
        { date: new RegExp('^'+year) }
    )
    // console.log(records);
    res.status(200).json({records: records, total: total});

});

mdRouter.get("/hasBurial/:page(\\d+)?", async (req, res) => {
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

mdRouter.get("/getYears", async (req, res) => {

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

mdRouter.get("/all", async (req, res) => {
    const records = await db.collection('milwaukeedeaths').find(
        {}, { sort: { date: 1, surname: 1 }}
    ).toArray();
    const total = records.length;

    res.status(200).json({records: records, total: total});
});

mdRouter.get("/count/:year?", async (req, res) => {
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

mdRouter.get("/:page(\\d+)?", async (req, res) => {
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

export default mdRouter;