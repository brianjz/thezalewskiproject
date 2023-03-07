import express from 'express';
import fetch from 'node-fetch'
const connRouter = express.Router();

const personFields = 'Id,Name,FirstName,LastNameCurrent,LastNameAtBirth,BirthDate,DeathDate,BirthLocation,DeathLocation,Gender,PhotoData,IsLiving,Touched,Manager,Father,Mother,Connected,Derived.LongName,Privacy,Parents,Spouses,HasChildren,Children'
const searchFields = 'Id,LastNameAtBirth,LastNameCurrent,FirstName,Name,BirthDate,DeathDate,BirthLocation,DeathLocation,Derived.LongName,Manager,IsLiving,Privacy'
connRouter.get("/getPerson/:id", async (req, res) => {
    const { id } = req.params

    const person = {};
    fetch(`https://api.wikitree.com/api.php?action=getPerson&key=${id}&fields=${personFields}`)
      .then(response => response.json())
      .then(person => {
        res.send(person[0]);
      })
      .catch(e => console.error(e));    
});

connRouter.get("/getZalewskiPeople/:page(\\d+)?", async (req, res) => {
    const pageLength = 50;
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