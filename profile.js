const stub = {
    birth: '21321321312312s',
    headline: 'This is my headline!',
    email: 'foo@bar.com',
    zipcode: 12345,
    avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
}

var isLoggedIn = require('./auth.js').isLoggedIn;

var models = require('./model.js');
var Profile = models.Profile;


const getHeadlines = (req, res) => {
    if(!req.params) {
        res.json({error:"no user input"});
        return;
    }
    Profile.findById(req.params.users,function (err, cur) {
        res.json({ headlines: cur});
      })
    
}

const changeHeadline = (req,res) => {
    if(!req.body.headline) return;
    let textC = req.body.headline;
    Profile.findById("5a0e25e5a5f4f5675c3c007d",function (err, cur) {
        cur.headline = textC;
        res.json({username:"test",headlines:textC});
        cur.save(function (err, cur) {
            if (err) return console.error(err);
          }); 
      })
}


const getAll = (req,res) => {
	Profile.find(function (err, cur) {
        if (!err) res.json(cur);
      })
    // if(req.username) res.json(req.username);
    // else res.json({1:1});
}
const changePassword = (req,res) => {
    res.send("password can not be changed")
}
const getEmail = (req,res) => {
    if(!req.params) return;
    if(req.params.user){
        Profile.findById(req.params.user,function (err, cur) {
            res.json({username:cur.user,email:cur.email});
          })
    }
    else {
        Profile.find({user:req.username},function (err, cur) {
            if(cur.length && cur.length > 1) res.json({username:req.username,email:cur[0].email});
            else res.json({username:req.username,email:cur.email});
          })
    }
}
const updateEmail = (req,res) => {
    Profile.findById("5a0e25e5a5f4f5675c3c007d",function (err, cur) {
        if(!err) {
            cur.email = req.body.email;
            res.json({username:req.username,email:cur.email});
            
            cur.save(function (err, cur) {
                if (err) return console.error(err);
                });
        }
      })
}

const getZip = (req,res) => {
    if(!req.params) return;
    if(req.params.user){
        Profile.findById(req.params.user,function (err, cur) {
            res.json({username:cur.user,zipcode:cur.zipcode});
          })
    }
    else {
        Profile.find({user:req.username},function (err, cur) {
            if(cur.length && cur.length > 1) res.json({username:req.username,zipcode:cur[0].zipcode});
            else res.json({username:req.username,zipcode:cur.zipcode});
          })
    }
}
const updateZip = (req,res) => {
    Profile.findById("5a0e25e5a5f4f5675c3c007d",function (err, cur) {
        if(!err) {
            cur.zipcode = req.body.zipcode;
            res.json({username:req.username,zipcode:cur.zipcode});
            
            cur.save(function (err, cur) {
                if (err) return console.error(err);
                });
        }
      })
}
const getDob = (req,res) => {
    res.json({username:req.username,dob:stub.birth});
}
const getAvatar = (req,res) => {
    res.json({avatars:[{username:req.username,avatar:stub.avatar}]});
}
const updateAvatar = (req,res) => {
    if(req.body.avatar) stub.avatar = req.body.avatar;
    res.json({username:req.username,avatar:stub.avatar});
}
module.exports = (app) => {
    app.use(isLoggedIn)
    app.get('/headlines',getAll)
    app.get('/headlines/:users', getHeadlines)
    app.put('/headline',changeHeadline)

    app.get('/email/:user?',getEmail)
    app.put('/email',updateEmail)

    app.get('/zipcode/:user?',getZip)
    app.put('/zipcode',updateZip)

    app.get('/dob',getDob)
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar',updateAvatar)
    app.put('/password',changePassword)

}