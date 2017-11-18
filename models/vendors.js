var mongoose = require('mongoose'),
    config = require('../config'),
    connection = mongoose.connection.openUri(config.db),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var vendorSchema = new Schema({
    name: String,
    category: {
        type: Number,
        ref: 'Categories'
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