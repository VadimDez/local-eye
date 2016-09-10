'use strict';

var app = require('../..');
import request from 'supertest';

var newAdvertisement;

describe('Advertisement API:', function() {

  describe('GET /api/advertisements', function() {
    var advertisements;

    beforeEach(function(done) {
      request(app)
        .get('/api/advertisements')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          advertisements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      advertisements.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/advertisements', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/advertisements')
        .send({
          name: 'New Advertisement',
          info: 'This is the brand new advertisement!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAdvertisement = res.body;
          done();
        });
    });

    it('should respond with the newly created advertisement', function() {
      newAdvertisement.name.should.equal('New Advertisement');
      newAdvertisement.info.should.equal('This is the brand new advertisement!!!');
    });

  });

  describe('GET /api/advertisements/:id', function() {
    var advertisement;

    beforeEach(function(done) {
      request(app)
        .get('/api/advertisements/' + newAdvertisement._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          advertisement = res.body;
          done();
        });
    });

    afterEach(function() {
      advertisement = {};
    });

    it('should respond with the requested advertisement', function() {
      advertisement.name.should.equal('New Advertisement');
      advertisement.info.should.equal('This is the brand new advertisement!!!');
    });

  });

  describe('PUT /api/advertisements/:id', function() {
    var updatedAdvertisement;

    beforeEach(function(done) {
      request(app)
        .put('/api/advertisements/' + newAdvertisement._id)
        .send({
          name: 'Updated Advertisement',
          info: 'This is the updated advertisement!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAdvertisement = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAdvertisement = {};
    });

    it('should respond with the updated advertisement', function() {
      updatedAdvertisement.name.should.equal('Updated Advertisement');
      updatedAdvertisement.info.should.equal('This is the updated advertisement!!!');
    });

  });

  describe('DELETE /api/advertisements/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/advertisements/' + newAdvertisement._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when advertisement does not exist', function(done) {
      request(app)
        .delete('/api/advertisements/' + newAdvertisement._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
