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

