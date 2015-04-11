'use strict';

var _ = require('lodash');
var Skim = require('./skim.model');

// Get list of skims
exports.index = function(req, res) {
  Skim.find(function (err, skims) {
    if(err) { return handleError(res, err); }
    return res.json(200, skims);
  });
};

// Get a single skim
exports.show = function(req, res) {
  Skim.findById(req.params.id, function (err, skim) {
    if(err) { return handleError(res, err); }
    if(!skim) { return res.send(404); }
    return res.json(skim);
  });
};

// Creates a new skim in the DB.
exports.create = function(req, res) {
  Skim.create(req.body, function(err, skim) {
    if(err) { return handleError(res, err); }
    return res.json(201, skim);
  });
};

// Updates an existing skim in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Skim.findById(req.params.id, function (err, skim) {
    if (err) { return handleError(res, err); }
    if(!skim) { return res.send(404); }
    var updated = _.merge(skim, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, skim);
    });
  });
};

// Deletes a skim from the DB.
exports.destroy = function(req, res) {
  Skim.findById(req.params.id, function (err, skim) {
    if(err) { return handleError(res, err); }
    if(!skim) { return res.send(404); }
    skim.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}