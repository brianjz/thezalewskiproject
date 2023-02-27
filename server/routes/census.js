import { ObjectId } from 'mongodb';
// import ensureToken from '../method.js';
import express from 'express';
import { db } from '../config/mongo.js';
const censusRouter = express.Router();

censusRouter.get("/getYears", async (req, res) => {
    const records = await db.collection('census').distinct('year');

    res.send({years: records});
});

censusRouter.get("/:year(\\d+)/getStates", async (req, res) => {
    const year = req.params.year;

    const records = await db.collection('census').distinct('state', { year: parseInt(year) });

    res.send({states: records});
});

censusRouter.get("/:year(\\d+)/:state", async (req, res) => {
    let { year, state } = req.params;
    state = state.replace('-', ' ')

    const counties = await db.collection('census').distinct('county', { year: parseInt(year), state: state })
        .then(async (counties) => {
            let records = []
            await Promise.all(counties.map(async (county) => {
                const cities = await db.collection('census').distinct('city', { year: parseInt(year), state: state, county: county })
                cities.sort();
                records.push({[county]: cities});
            }))
            return records;
        })
        .then((records) => res.send({stateinfo: records}))
});

/** gets all people in city census grouped by ED and Family # */
censusRouter.get("/:year(\\d+)/:state/:city", async (req, res) => {
    let { year, state, city } = req.params;
    city = city.replace('-', ' ')
    state = state.replace('-', ' ')
    const sort = req.query.sort;

    let sortData = { ed: 1, surname: 1, family: 1, age: -1 };
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

    const records = await db.collection('census').aggregate([
        {
            $match: {
                city: city,
                year: parseInt(year),
                state: state,
            },
        },
        {
            $addFields:
            {
                agenum: { // convert age to int to sort since some ages are written as fractions, default them to 0
                    $convert: {
                    input: "$age",
                    to: "int",
                    onError: 0,
                    },
                }, 
                relationSort: { // sort by Head first, then Wife, then others
                    $cond: {if: {$eq: ['$relation', 'Head']}, then: 0,
                       else: {$cond: {if: {$eq: ['$relation', 'Wife']},
                         then: 1, else: 2}}}
                }
            },
        },
        {
            $sort: {
                ed: 1,
                family: 1,
                surname: 1,
                relationSort: 1,
                agenum: -1
            },
        },
        {
            $project: {
                _id: 1, surname: 1, firstname: 1, sex: 1, relation: 1, age: 1, ed: 1, family: 1
            }
        },
        {
            $group: { // merge families into groups by ED-FAM#
                _id: {
                $concat: [
                    {
                    $toString: "$ed",
                    },"-",
                    {
                    $toString: "$family",
                    },
                ],
                },
                people: {
                $push: "$$ROOT",
                },
            },
        },
        {
            $sort: { _id: 1 }
        },
    ]).toArray();
    res.send({records: records});
});

censusRouter.get("/person/:id", async (req, res) => {
    const id = req.params.id;

    const record = await db.collection('census').find({_id: new ObjectId(id)}).toArray()

    res.send(record);
});



export default censusRouter;