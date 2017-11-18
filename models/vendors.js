var mongoose = require('mongoose'),
    config = require('../config'),
    connection = mongoose.connection.openUri(config.db),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        ref: 'Categories',
        required: true
    },
    address: String,
    contactPerson: {
        name: String,
        number: []
    },
    availability: {
        startTime: Date,
        endTime: Date
    },
    deliveryTime: String,
    deliveryOptions: String,
    thumbnail: String
});

vendorSchema.plugin(autoIncrement.plugin, 'Vendors');
mongoose.model('Vendors', vendorSchema);