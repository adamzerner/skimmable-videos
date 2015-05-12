'use strict';

var _ = require('lodash');
var Preview = require('./preview.model');

// probably just need create, show and delete

// Get list of previews
exports.index = function(req, res) {
  Preview.find(function (err, previews) {
    if(err) { return handleError(res, err); }
    return res.json(200, previews);
  });
};

// Get a single preview
exports.show = function(req, res) {
  Preview.findById(req.params.id, function (err, preview) {
    if(err) { return handleError(res, err); }
    if(!preview) { return res.send(404); }
    return res.json(preview);
  });
};

// Creates a new preview in the DB.
exports.create = function(req, res) {
  Preview.create(req.body, function(err, preview) {
    if(err) { return handleError(res, err); }
    return res.json(201, preview);
  });
};

// Updates an existing preview in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Preview.findByIdAndUpdate(req.params.id, req.body, function(err, preview) {
    if (err) { return handleError(res, err); }
    if(!preview) { return res.send(404); }
    return res.json(200, preview);
  });
};

// Deletes a preview from the DB.
exports.destroy = function(req, res) {
  Preview.findByIdAndRemove(req.params.id, function(err, preview) {
    if(err) { return handleError(res, err); }
    if(!preview) { return res.send(404); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}