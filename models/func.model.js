const mongoose = require('mongoose');

var Schema = mongoose.Schema

/**
 * @module func.model
 */

/**
 *
 * @class funcSchema
 * @param {String} fullName
 * @param {String} name
 *
 */
var funcSchema = new Schema({
    fullName: {
      type: String
    },
    name: {type: String},

});

module.exports = mongoose.model('func', funcSchema);
