var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

router
    .get('/', function (req, res, next) {
        mongoose.model('Products').find({}, function (err, products) {
            if (err) {
                res.status(500);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Fatal error.'
                        });
                    }
                });
            }
            else if (!products.length) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'No products found.'
                        });
                    }
                });
            }
            else {
                res.status(200);
                res.format({
                    json: function () {
                        res.json({
                            success: true,
                            data: products
                        });
                    }
                });
            }
        });
    })
    .get('/:id', function (req, res, next) {
        mongoose.model('Products').findById(req.params.id, function (err, product) {
            if (err) {
                res.status(500);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Fatal error.'
                        });
                    }
                });
            }
            else if (!product) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Product not found: ' + req.params.id
                        });
                    }
                });
            }
            else {
                res.status(200);
                res.format({
                    json: function () {
                        res.json({
                            success: true,
                            data: product
                        });
                    }
                });
            }
        });
    })
    .post('/', function (req, res, next) {
        mongoose.model('Vendors').findById(req.body.vendor, function (err, vendor) {
            if (err) {
                res.status(500);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Fatal error.'
                        });
                    }
                });
            }
            else if (!vendor) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Vendor not found: ' + req.params.id
                        });
                    }
                });
            }
            else {
                mongoose.model('Products').create(req.body, function (err, product) {
                    if (err) {
                        res.status(500);
                        res.format({
                            json: function () {
                                res.json({
                                    success: false,
                                    message: 'Fatal error.'
                                });
                            }
                        });
                    }
                    else {
                        res.status(201);
                        res.format({
                            json: function () {
                                res.json({
                                    success: true,
                                    message: 'Product created successfully.',
                                    id: product.id
                                });
                            }
                        });
                    }
                });
            }
        });
    })
    .delete('/:id', function (req, res, next) {
        mongoose.model('Products').findByIdAndRemove(req.params.id, function (err, product) {
            if (err) {
                res.status(500);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Fatal error.'
                        });
                    }
                });
            }
            else if (!product) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Product not found: ' + req.params.id
                        });
                    }
                });
            }
            else {
                res.status(200);
                res.format({
                    json: function () {
                        res.json({
                            success: true,
                            message: 'Product removed successfully: ' + product.id
                        });
                    }
                });
            }
        });
    });

module.exports = router;