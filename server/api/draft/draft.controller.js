'use strict';

var _ = require('lodash');
var Draft = require('./draft.model');

// Get list of drafts
exports.index = function(req, res) {
  Draft
    .find()
    .populate('author')
    .exec(function(err, skims) {
      if (err) { return handleError(res, err); }
      return res.json(200, skims);
    });
};

// Get a single draft
exports.show = function(req, res) {
  Draft
    .findById(req.params.id)
    .populate('author')
    .exec(function(err, skim) {
      if(err) { return handleError(res, err); }
      if(!skim) { return res.send(404); }
      return res.json(skim);
    });
};

// Creates a new draft in the DB.
exports.create = function(req, res) {
  Draft.create(req.body, function(err, draft) {
    if(err) { return handleError(res, err); }
    return res.json(201, draft);
  });
};

// Updates an existing draft in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Draft.findByIdAndUpdate(req.params.id, req.body, function(err, draft) {
    if (err) { return handleError(res, err); }
    if(!draft) { return res.send(404); }
    return res.json(200, draft);
  });
};

// Deletes a draft from the DB.
exports.destroy = function(req, res) {
  Draft.findByIdAndRemove(req.params.id, function(err, draft) {
    if(err) { return handleError(res, err); }
    if(!draft) { return res.send(404); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}