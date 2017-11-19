const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const should = require('chai').should()

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', function() {
	it('PUT/headline is valid', function(done) {
		api.put('/headline')
		.set('Accept','application/json')
		.send({
			headline: "whatever"
		})
		.end(function(err,res){
			expect(res.body.headlines).to.equal("whatever");
			done();
		});	
 	});

 	it('POST/article is valid', function(done) {
		api.post('/article')
		.set('Accept','application/json')
		.send({
			text:"what?"
		})
		.end(function(err,res){
			expect(res.body.articles.text).to.equal('what?');
			done();
		});
 	});
});