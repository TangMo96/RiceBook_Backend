const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// if (process.env.NODE_ENV !== "production") {
//     require('dot-env')
// }

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

require('./articles.js')(app)
require('./auth.js').run(app)
require('./profile.js')(app)
require('./following.js')(app)
require('./model.js')

app.get('/', function(req, res) {
    console.log('Cookies: ', req.cookies)
  })
  
function isLoggedIn(req, res, next) {   
    // var id = req.cookies['sessionId']    
    // ...
    // req.user = ...
    res.json({middleware:"used"});
    return next()
}

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http:${addr.address}:${addr.port}`)
})