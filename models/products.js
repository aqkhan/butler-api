var mongoose = require('mongoose'),
    config = require('../config'),
    connection = mongoose.connection.openUri(config.db),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var productsSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    vendor: {
        type: Number,
        ref: 'Vendors',
        required: true
    },
    category: {
        type: Number,
        ref: 'Categories',
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    attributeSet: [],
    inStock: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: -1
    },
    commissionRate: {
        type: Number,
        default: 10
    },
    dimensions: [],
    deliveryType: String,
    deliveryCharges: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        required: true
    },
    imgSet: [],
    createdBy: {
        type: Number,
        default: 0
    },
    totalHits: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateModified: {
        type: Date,
        default: Date.now()
    }
});

productsSchema.plugin(autoIncrement.plugin, 'Products');
mongoose.model('Products', productsSchema);