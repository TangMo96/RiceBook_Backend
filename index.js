const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const app = express()


app.use(function (req, res, next) {
        var cuihaosb = req.header.origin || "*";
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', cuihaosb);
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
});



app.use((req, res,next) => {
    if(req.method === 'OPTIONS')    res.status(200).send("ok");
    else next();
});

app.use(bodyParser.json())
app.use(cookieParser())



require('./auth.js').run(app)
require('./profile.js')(app)
require('./following.js')(app)
require('./model.js')
require('./articles.js')(app)





const hello = (req, res) => res.send({ hello: 'world' })
app.get('/', hello)


const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http:${addr.address}:${addr.port}`)
})