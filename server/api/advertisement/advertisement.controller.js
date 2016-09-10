/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/advertisements              ->  index
 * POST    /api/advertisements              ->  create
 * GET     /api/advertisements/:id          ->  show
 * PUT     /api/advertisements/:id          ->  update
 * DELETE  /api/advertisements/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Advertisement from './advertisement.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Advertisements
export function index(req, res) {
  if (req.query.hasOwnProperty('latitude')) {
    return Advertisement.find({
        $and : [
          {
          $or : [
            {
             $and : [
              {'southwest_latitude' : { $gt: req.query.latitude }},
              {'northeast_latitude' : { $lt: req.query.latitude }}
              ]
            },
            {
             $and: [
              {'southwest_latitude' : { $lt: req.query.latitude }},
              {'northeast_latitude' : { $gt: req.query.latitude }}
            ]} ,
          ]
          },

          {
          $or : [
            {
              $and : [
              {'southwest_longitude' : { $gt: req.query.longitude }},
              {'northeast_longitude' : { $lt: req.query.longitude }}
            ]},
            {
              $and : [
              {'southwest_longitude' : { $lt: req.query.longitude }},
              {'northeast_longitude' : { $gt: req.query.longitude }}
            ]} ,
          ]
          }
        ]
        })
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));

  }
  return Advertisement.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Advertisement from the DB
export function show(req, res) {
  return Advertisement.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Advertisement in the DB
export function create(req, res) {
  return Advertisement.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Advertisement in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Advertisement.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Advertisement from the DB
export function destroy(req, res) {
  return Advertisement.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
