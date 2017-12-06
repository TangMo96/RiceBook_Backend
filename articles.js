
var models = require('./model.js');
var Article = models.Article;
var isLoggedIn = require('./auth.js').isLoggedIn;
var Article_hw7 = models.Article_hw7;

const getAll = (req,res) => {
	// Article.find(function (err, cur) {
    //     if (!err) res.json(cur);
	//   })
	Article_hw7.find(function (err, cur) {
        if (!err) res.json(cur);
      })
}

// const getArticle = (req,res) =>{
// 	if(!req.params) {
//         res.json({error:"no user input"});
//         return;
// 	}
// 	if(!req.params.id) 
// 	{
// 		Article.find(function (err, follow) {
// 			res.json({articles:follow});
// 		});
// 		return;
// 	}
// 	Article.findById(req.params.id, function(err, animals) {
// 		res.json({articles:animals});
// 	});
// }
const getArticle = (req,res) =>{
	if(!req.params) {
        res.json({error:"no user input"});
        return;
	}
	if(!req.params.name) 
	{
		Article_hw7.find(function (err, follow) {
			res.json({articles:follow});
		});
		return;
	}

	Article_hw7.find({'author':req.params.name}).
	// where().euqals().
	sort({time:-1}).
	limit(10).
	exec(function(err,person){
		res.json({recent_articles:person})
	})
	

}


const getNewArticle = (req,res) => {
	if(!req.params || !req.body) return;
	let textC = req.body.text;
	var addArtice = new Article({myId:2,author:'tangmo',text:textC,date:'date',comments:['com']});
	addArtice.save(function (err, cur) {
		if (err) return console.error(err);
		res.json({articles:cur});
	}); 
	
}

const updateArticle = (req,res) => {
	if(!req.params || !req.body) return;
	let textC = req.body.text;
	if(!req.body.commentId){
		Article.findById(req.params.id, function(err, animals) {
			animals.text = textC;
			res.json({articles:animals});
			animals.save(function (err, cur) {
				if (err) return console.error(err);
			}); 
		})
	}
	else {
		Article.findById(req.params.id, function(err, animals) {
			if(req.body.commentId!=-1) {
				animals.comments.splice(0,animals.comments.length);
			}
			animals.comments.push(textC);
			res.json({articles:animals});
			animals.save(function (err, cur) {
				if (err) return console.error(err);
			}); 
		})
	}
}



module.exports = (app) => {
	// app.use(isLoggedIn)
	app.get('/articles/getAll',getAll)
	app.get('/articles/:name?',getArticle)
	app.post('/article',getNewArticle)
	app.put('/articles/:id',updateArticle)
}