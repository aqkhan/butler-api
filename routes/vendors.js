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
        mongoose.model('Vendors').find({}, function (err, vendors) {
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
            else if (!vendors.length) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'No vendors found.'
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
                            payLoad: vendors
                        });
                    }
                });
            }
        });
    })
    .get('/:id', function (req, res, next) {
        mongoose.model('Vendors').findById(req.params.id, function (err, vendor) {
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
                res.status(200);
                res.format({
                    json: function () {
                        res.json({
                            success: true,
                            payLoad: vendor
                        });
                    }
                });
            }
        });
    })
    .post('/', function (req, res, next) {
        mongoose.model('Vendors').create(req.body, function (err, vendor) {
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
                            message: 'Vendor created successfully.',
                            id: vendor.id
                        });
                    }
                });
            }
        });
    })
    .put('/:id', function (req, res, next) {
        mongoose.model('Vendors').findByIdAndUpdate(req.params.id, req.body, function (err, vendor) {
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
                res.status(200);
                res.format({
                    json: function () {
                        res.json({
                            success: true,
                            message: 'Vendor updated successfully: ' + vendor.id
                        });
                    }
                });
            }
        });
    })
    .delete('/:id', function (req, res, next) {
        mongoose.model('Vendors').findByIdAndRemove(req.params.id, function (err, vendor) {
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
                res.status(200);
                res.format({
                    json: function () {
                        res.json({
                            success: true,
                            message: 'Vendor removed successfully: ' + vendor.id
                        });
                    }
                });
            }
        });
    });

router.get('/category/:category', function (req, res, next) {
    mongoose.model('Vendors').find({'category': req.params.category}, function (err, vendors) {
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
        else if (!vendors.length) {
            res.status(404);
            res.format({
                json: function () {
                    res.json({
                        success: false,
                        message: 'No vendors found.'
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
                        payLoad: vendors
                    });
                }
            });
        }
    });
});

module.exports = router;