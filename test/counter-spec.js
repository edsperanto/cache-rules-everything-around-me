const chai = require('chai');
const should = chai.should();
const server = require('../server');
const supertest = require('supertest');
const agent = supertest.agent(server);

describe('sanity', () => {
	it('should be true', () => {
		true.should.be.true;
	});
});

describe('cache rulz', () => {
	describe('GET /', () => {
		it('should load', done => {
			agent.get('/')
				.end((err, res) => {
					if(err) throw err;
					done();
				});
		});
	});
});
