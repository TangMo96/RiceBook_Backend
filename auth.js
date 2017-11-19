var models = require('./model.js')
var Profile = models.Profile;
const md5 = require('md5');
var User = models.User;
var bcrypt = require('bcryptjs');
// const redis = require('redis'),
//     client = redis.createClient();
var cookieParser = require('cookie-parser')
var sessionUser ={};
var Test = models.Test;
const login = (req,res) => {
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password) {
		res.sendStatus(400);
		return;
	}
	Test.find({username: username},function(err,user){
		if (err) return console.log(err);
		if (!user ) {
			res.status(401).send({"error":"no"});
			return;
		}
		var sessionKey = md5(username+new Date().getTime());
		sessionUser[sessionKey] = username; 
		res.cookie(cookieKey,sessionKey,{maxAge: 3600*1000,httpOnly:true});
	
		res.send({username:username,result:'success'});
	})
}

const logout = (req,res) => {
	// res.cookie(cookieKey,1,{maxAge: 1,httpOnly:true})
	// res.clearCookie(cookieKey, {path:'/'});
	res.cookie(cookieKey, '1', {maxAge: 1000,httpOnly:true});
	res.send("logged out");
}

const register = (req,res) => {
	if(!req.body) return;
	let username = req.body.username, email = req.body.email, dob = req.body.dob,zipcode = req.body.zipcode,password = req.body.password;
	var newProfile = new Profile({ user:username,headline: 'This is my headline!',	email: email,zipcode: zipcode,avatar: dob });
    newProfile.save(function (err, cur) {
        if (err) return console.error(err);
		});
	res.json({result:"success",username:username});
}

var cookieKey = 'sid';

function isLoggedIn(req,res,next){
	var sid = req.cookies[cookieKey]
	if(!sid) return res.sendStatus(401);
	console.log(sid);
	var username = sessionUser[sid]
	if(username) {
		req.username = username;
		next();
	}
	else {
		res.sendStatus(401)
	}
	// return next();
}
const getAll = (req,res) => {
	Test.find(function (err, cur) {
        if (!err) res.json(cur);
      })
}

module.exports = {
	isLoggedIn: isLoggedIn,

	run: (app) => {
		app.get('/getAll',getAll)
		app.post('/login',login)
		app.post('/register',register)
		app.put('/logout',logout)
		// app.put('/password',password)
	}
}
