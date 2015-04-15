// easier for Preview's to be separate objects
// if I used Skim, I'd have to exclude skims with the flag of preview every time I iterated over Skims

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubsectionSchema = new Schema({
  hour: { type: Number, min: 0, required: true },
  minute: { type: Number, min: 0, max: 59, required: true },
  second: { type: Number, min: 0, max: 59, required: true },
  description: String,
  thumbnail: String
});

var SectionSchema = new Schema({
  title: { type: String, required: true },
  hour: { type: Number, min: 0, required: true },
  minute: { type: Number, min: 0, max: 59, required: true },
  second: { type: Number, min: 0, max: 59, required: true },
  thumbnail: String,
  subsections: [SubsectionSchema]
});

var PreviewSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Number, min: 0, required: true },
  minutes: { type: Number, min: 0, max: 59, required: true },
  seconds: { type: Number, min: 1, max: 59, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // required: true
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  sections: { type: [SectionSchema], required: true }
});

module.exports = mongoose.model('Preview', PreviewSchema);