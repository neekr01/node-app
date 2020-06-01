process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const mongoose = require('mongoose');
const User = require('../models/schema');

chai.use(chaiHttp);

describe('Unit tests for node app', () => {
   beforeEach((done) => {
       User.deleteMany({},(err) => {
           done();
       })
   })
   describe('Server and database', () => {
    it('should start the server and connect to the database', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        }); 
    });
    
   describe('/GET User', () => {
    it('should display all the users in the db', (done) => {
        chai.request(server)
        .get('/user')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
      }) ;
    });

   describe('/POST User', () => {
    it('should add a user in the db', (done) => {
        let user = {
            name: "Test",
            city: "TestCity"
        }
        chai.request(server)
            .post('/user')
            .send(user)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    }); 
    
    it('should not add a user in the db if city field is missing', (done) => {
        let user = {
            name: "Test2"
        }
        chai.request(server)
            .post('/user')
            .send(user)
            .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a.toString("User validation failed: city: Path `city` is required")
            done();
        })
    });

    it('should not add a user in the db if name field is missing', (done) => {
        let user = {
            city: "TestCity"
        }
        chai.request(server)
            .post('/user')
            .send(user)
            .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a.toString("User validation failed: name: Path `name` is required")
            done();
        })
    });
  });
});