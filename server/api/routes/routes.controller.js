'use strict';

import User from './../user/user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {

  var request = require('request')

  let body = '';
  request
    .get('https://maps.googleapis.com/maps/api/directions/json?origin='+ req.query.start + '&destination=' + req.query.end)
    .on('data', function(chunk) {
        body = body + chunk
    })
    .on('end', function() {
        var respBody = JSON.parse(body);
        var polyline = require('polyline');
        var allPoints = polyline.decode(respBody.routes[0].overview_polyline.points);
        return res.status(200).json({points: allPoints}).end();
    })

}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
