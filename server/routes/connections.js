import express from 'express';
import fetch from 'node-fetch'
import { db } from '../config/mongo.js';

const connRouter = express.Router();

const personFields = 'Id,Name,FirstName,LastNameCurrent,LastNameAtBirth,BirthDate,DeathDate,BirthLocation,DeathLocation,Gender,PhotoData,IsLiving,Touched,Manager,Father,Mother,Connected,Derived.LongName,Privacy,Parents,Spouses,HasChildren,Children'
const searchFields = 'Id,LastNameAtBirth,LastNameCurrent,FirstName,Name,BirthDate,DeathDate,BirthLocation,DeathLocation,Derived.LongName,Manager,IsLiving,Privacy'

connRouter.get("/getPerson/:id", async (req, res) => {
    const { id } = req.params

    // Check for existing cached object in database of at least 1 day
    const dayAgo = new Date((new Date().getTime() - (1000 * 60 * 60 * 24)))
    const localPerson = await db.collection('wikitree').find(
      {user_name: id, lastModified: {"$gt": dayAgo}}
    ).toArray();

    // if not recently cached, pull from API and cache it
    const curId = { user_name: id }
    if(localPerson.length === 0) {
      // console.log('API --> ', curId)
      const person = {};
      fetch(`https://api.wikitree.com/api.php?action=getPerson&key=${id}&fields=${personFields}`)
        .then(response => response.json())
        .then(person => {
          person[0].lastModified = new Date()
          db.collection('wikitree').replaceOne(curId, person[0], { upsert: true })
          res.send(person[0]);
        })
        .catch(e => console.error(e));    
    } else {
      res.send(localPerson[0]);
    }
});

connRouter.get("/getZalewskiPeople/:page(\\d+)?", async (req, res) => {
    const pageLength = req.query.pagesize || 50;

    const { page } = req.params;
    let offset = 0;
    if(page && page > 0) {
        offset = pageLength * (page - 1);
    }


    fetch(`https://api.wikitree.com/api.php?action=searchPerson&start=${offset}&LastName=Zalewski&fields=${searchFields}&skipVariants=0&sort=birth&lastNameMatch=birth&limit=${pageLength}`)
    .then(response => response.json())
    .then(json => {
      res.send(json);
    })
    .catch(e => console.error(e));    
});


export default connRouter;