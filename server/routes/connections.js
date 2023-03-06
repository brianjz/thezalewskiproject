import express from 'express';
import fetch from 'node-fetch'
const connRouter = express.Router();

const personFields = 'Id,Name,FirstName,LastNameCurrent,LastNameAtBirth,BirthDate,DeathDate,BirthLocation,DeathLocation,Gender,PhotoData,IsLiving,Touched,Manager,Father,Mother,Connected,Derived.LongName,Privacy,Parents,Spouses,HasChildren,Children'
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


export default connRouter;