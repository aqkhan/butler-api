var mongoose = require('mongoose'),
    config = require('../config'),
    connection = mongoose.connection.openUri(config.db),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var categorySchema = new Schema({
    name: String,
    hits: Number,
    thumbnail: String
});

categorySchema.plugin(autoIncrement.plugin, 'Categories');
mongoose.model('Categories', categorySchema);