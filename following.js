var models = require('./model.js');
var Following = models.Following;
var isLoggedIn = require('./auth.js').isLoggedIn;

const getFollowing = (req,res) => {
	if(!req.params) {
        res.json({error:"no following input"});
        return;
	}
	let user = req.params.user? req.params.user : 1;
    Following.findById(user, function(err, animals) {
        res.json(animals);
	  });
}

const addFollowing = (req,res) => {
	if(!req.params || !req.params.user){
        res.json({error:"wrong input"});
        return;
	}

	
    Following.findById(req.params.user, function(err, animals) {
		if(!err){
			animals.following.push(req.body.userId);
			animals.save(function(err){
				if(!err) console.log('good');
			})
			res.json(animals.following);	
		}
	  });

}

const getAll = (req,res) => {
	Following.find(function (err, cur) {
        if (!err) res.json(cur);
      })
}

const deleteFollowing = (req,res) => {
	if(!req.params || !req.params.user){
        res.json({error:"wrong"});
        return;
	}
	if(!req.params.user) return;
	let deleteCur = req.params.user;
	Following.findById('5a0dfacfde037a5fd2fc1fcb', function(err, animals) {
		if(!err){
			for(let i=0;i<animals.following.length;i++){
				if(animals.following[i]==deleteCur){
					animals.following.splice(i,1);
					res.json({username:animals.username,following:animals.following})
					break;
				}
			}
			animals.save(function(err){
				if(!err) console.log('good');
			})
		}
	  });
}

module.exports = (app) => {
	// app.use(isLoggedIn)
	app.get('/following/getAll',getAll);
	app.get('/following/:user?',getFollowing);
	app.put('/following/:user',addFollowing);
	app.delete('/following/:user',deleteFollowing);

}