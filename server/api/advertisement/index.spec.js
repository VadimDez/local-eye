'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var advertisementCtrlStub = {
  index: 'advertisementCtrl.index',
  show: 'advertisementCtrl.show',
  create: 'advertisementCtrl.create',
  update: 'advertisementCtrl.update',
  destroy: 'advertisementCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var advertisementIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './advertisement.controller': advertisementCtrlStub
});

describe('Advertisement API Router:', function() {

  it('should return an express router instance', function() {
    advertisementIndex.should.equal(routerStub);
  });

  describe('GET /api/advertisements', function() {

    it('should route to advertisement.controller.index', function() {
      routerStub.get
        .withArgs('/', 'advertisementCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/advertisements/:id', function() {

    it('should route to advertisement.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'advertisementCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/advertisements', function() {

    it('should route to advertisement.controller.create', function() {
      routerStub.post
        .withArgs('/', 'advertisementCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/advertisements/:id', function() {

    it('should route to advertisement.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'advertisementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/advertisements/:id', function() {

    it('should route to advertisement.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'advertisementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/advertisements/:id', function() {

    it('should route to advertisement.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'advertisementCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
