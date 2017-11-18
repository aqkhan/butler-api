var mongoose = require('mongoose'),
    config = require('../config'),
    connection = mongoose.connection.openUri(config.db),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    hits: {
        type: Number,
        default: 0
    },
    thumbnail: String
});

categorySchema.plugin(autoIncrement.plugin, 'Categories');
mongoose.model('Categories', categorySchema);