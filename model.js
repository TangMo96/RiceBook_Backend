var mongoose = require('mongoose');
mongoose.connect('mongodb://mt60:Tm19960210.@ds149495.mlab.com:49495/ricetencent');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});



//___________________测试-----------------------------
var tests = mongoose.Schema({
    username: String,
    password: String
});
var Test = mongoose.model('Test',tests);
Test.find(function (err, follow) {
    if(follow.length==0){
    var defaultTest = new Test({ username:'test',password:'1'});
    defaultTest.save(function (err, cur) {
        if (err) return console.error(err);
        });
    }
})
exports.Test = Test;
//___________________测试-----------------------------


//---------------------
var users = mongoose.Schema({
    username: String,
    salt: String,
    hash: String
});
var User = mongoose.model('User',users);
User.find(function (err, follow) {
    if(follow.length==0){
    var defaultUser = new User({ username:'nouse',salt:'1',hash:'1'});
    defaultUser.save(function (err, cur) {
        if (err) return console.error(err);
        });
    }
})
//-----------------
const authorList = ["tangmo","migu","moxingyu","liujinrui"];
const textList = ["ha","1214123","lalala","I am happy","who are you","sasaadasd"];

var article_hw7 = mongoose.Schema({
    author: String,
    text: String,
    time: [Date],
});
var Article_hw7 = mongoose.model('Article_hw7',article_hw7);
Article_hw7.find(function (err, follow) {

    var defaultArticle_hw7 = new Article_hw7({ author:authorList[Math.floor(Math.random()*4)],text:textList[Math.floor(Math.random()*6)],time:new Date });
    defaultArticle_hw7.save(function (err, cur) {
        if (err) return console.error(err);
        });
    
})


var profiles = mongoose.Schema({
    user: String,
    headline: String,
    email: String,
    zipcode: Number,
    avatar: String,
});

var Profile = mongoose.model('Profile',profiles);
// Profile.remove({}, (err)=>{
// 	if (err) {
// 		console.log('Phone remove all occur a error:', err);
// 	} else {
// 		console.log('Phone remove all success.');
// 	}
// });
Profile.find(function (err, follow) {
    if(follow.length==0){
    var defaultProfile = new Profile({ user:'test',headline: 'This is my headline!',email: 'foo@bar.com',zipcode: 12345,avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg' });
    defaultProfile.save(function (err, cur) {
        if (err) return console.error(err);
        });
    }
})


var articles = mongoose.Schema({
    myId: Number,
    author: String,
    text: String,
    date: String,
    comments: [String]
});
articles.statics.findByMyId = function(name, cb) {
    return this.find({ myId: name }, cb);
  };
var Article = mongoose.model('Article',articles);
// Article.remove({}, (err)=>{
// 	if (err) {
// 		console.log('Phone remove all occur a error:', err);
// 	} else {
// 		console.log('Phone remove all success.');
// 	}
// });
Article.find(function (err, follow) {
    if(follow.length<10){
        var defaultArtice = new Article({myId:1,author:'test',text:'testText',date:'test date',comments:['test com1','test com2']});
        defaultArtice.save(function (err, cur) {
            if (err) return console.error(err);
          }); 
    }
})



var followings = mongoose.Schema({
    username: String,
    following: [Number],
    userId: Number
});
var Following = mongoose.model('Following',followings);

Following.find(function (err, follow) {
    if (follow.length==0) {
        var defaultFollowing = new Following({username: 'test',following:[1,2,3],userId:1});
        defaultFollowing.save(function (err, cur) {
            if (err) return console.error(err);
          });
    }
  })

exports.Profile = Profile;
exports.Article = Article;
exports.Following = Following;
exports.Article_hw7 = Article_hw7;



exports.User = User;



