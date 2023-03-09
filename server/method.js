import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

const ensureToken = (req, res, next) => {
    var bearerHeader = req.headers["authorization"] 
    // console.log(bearerHeader);

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        verify(bearerToken, process.env.APITOKENSECRET, (err, result) => {
          if(err) { res.sendStatus(403) }
          else{ next() }
        });
    } else {
        res.sendStatus(403)
    }
}

export default ensureToken;