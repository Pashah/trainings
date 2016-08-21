var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');

describe('Routes', function() {
  var url = 'http://localhost:8080';
  describe('User tests', function() {
    it('creating new user', function(done) {
      var user = {
        name: 'Test Person'
      };
      request(url)
      .post('/users')
  	  .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
    	.end(function(err, res) {
        if(err) {
          throw err;
        }
        res.body.name.should.equal('Test Person');
        done();
      });
    });
    it('getting existing user', function(done) {
      var userId = 1
      request(url)
      .get('/users/' + userId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        res.body.id.should.equal(userId);
        res.body.name.should.equal('Miika');
        done();
      });
    });
    it('getting all users', function(done) {
      request(url)
      .get('/users/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
      var users = res.body;
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        user.should.have.property('id');
        user.should.have.property('name');
      }
      done();
      });
    });
  });
  describe('Trainings tests', function() {
    it('creating new training', function(done) {
      var training = {name: 'Test training', userId: 1}
      request(url)
      .post('/trainings/')
      .send(training)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        res.body.name.should.equal(training.name);
        res.body.userId.should.equal(training.userId);
        done();
      });
    });
    it('getting existing training', function(done) {
      var trainingId = 1;
      request(url)
      .get('/trainings/' + trainingId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        var training = res.body;
        training.name.should.equal('Miikan treeni');
        training.id.should.equal(trainingId);
        training.created_by.should.equal(1);
        training.should.have.property('id');
        training.should.have.property('created');
        training.should.have.property('modified');
        done();
      })
    });
    it('getting all existing trainings', function(done) {
      request(url)
      .get('/trainings/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          throw err;
        }
        var trainings = res.body;
        for(var i = 1; i < trainings.length; i++) {
          var training = trainings[1];
          training.should.property('id');
          training.should.property('name');
          training.should.property('created_by');
          training.should.property('created');
          training.should.property('modified');
        }
        done();
      });
    });
  });
});
