'use strict';

var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    if (err) return handleError(res, err);
    if (!user) return res.send(404);
    return res.json(200, user);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  User
    .findById(req.params.id)
    .populate('skimsCreated starredSkims drafts')
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      // nested populate http://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
      var options = [{
        path: 'starredSkims.author',
        model: 'User'
      }, {
        path: 'drafts.author',
        model: 'User'
      }];
      User.populate(user, options, function(err, user) {
        res.json(user);
      });
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */

exports.destroy = function(req, res) {
  var Draft = require('../draft/draft.model');
  var Skim = require('../skim/skim.model');
  User.findById(req.params.id, function(err, user) { // pre hook isn't working for some reason
    if (err) return res.send(500, err);
    user.skimsCreated.forEach(function(skimId) {
      Skim.findByIdAndRemove(skimId, function() {});
    });
    user.drafts.forEach(function(draftId) {
      Draft.findByIdAndRemove(draftId, function() {});
    });
    User.findByIdAndRemove(req.params.id, function(err, user) {
      if(err) return res.send(500, err);
      return res.send(204);
    });
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.send(500, err);
}