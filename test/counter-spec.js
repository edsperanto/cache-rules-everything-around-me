const chai = require('chai');
const should = chai.should();
const server = require('../server');
const supertest = require('supertest');
const agent = supertest.agent(server);

var timer;
var secs1 = 0;
var secs2 = 0;
var toggle = true;

describe('sanity', () => {
	it('should be true', () => {
		true.should.be.true;
	});
});

describe('cache rulz', () => {
	describe('GET /', () => {
		it('should load', done => {
			agent.get('/')
				.expect('Content-Type', /html/)
				.expect(200)
				.end((err, res) => {
					if(err) throw err;
					done();
				});
		});
	});
	describe('GET /slow', () => {
		timer = setInterval(() => {
			if(toggle) secs1++;
			else secs2++;
		}, 1000);
		it('should load slowly at first', done => {
			agent.get('/slow')
				.expect('Content-Type', /html/)
				.expect(200)
				.end((err, res) => {
					if(err) throw err;
					toggle = false;
					done();
				});
		}).timeout(10000);
		it('should load second time', done => {
			agent.get('/slow')
				.end((err, res) => {
					if(err) throw err;
					clearTimeout(timer);
					done();
				});
		});
		it('should be faster second time', done => {
			(secs1 > secs2).should.be.true;
			done();
		});
	});
});
