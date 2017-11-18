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

// Basic CRUD

router
    .get('/', function (req, res, next) {
        mongoose.model('Categories').find({}, function (err, categories) {
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
            else if (!categories.length) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'No categories found.'
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
                            payLoad: categories
                        });
                    }
                });
            }
        });
    })
    .get('/:id', function (req, res, next) {
        mongoose.model('Categories').findById(req.params.id, function (err, category) {
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
            else if (!category) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Category not found: ' + req.params.id
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
                            payLoad: category
                        });
                    }
                });
            }
        });
    })
    .post('/', function (req, res, next) {
        mongoose.model('Categories').create(req.body, function (err, category) {
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
                            message: 'Category created successfully.',
                            id: category.id
                        });
                    }
                });
            }
        });
    })
    .put('/:id', function (req, res, next) {
        mongoose.model('Categories').findByIdAndUpdate(req.params.id, req.body, function (err, category) {
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
            else if (!category) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Category not found: ' + req.params.id
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
                            message: 'Category updated successfully: ' + category.id
                        });
                    }
                });
            }
        });
    })
    .delete('/:id', function (req, res, next) {
        mongoose.model('Categories').findByIdAndRemove(req.params.id, function (err, category) {
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
            else if (!category) {
                res.status(404);
                res.format({
                    json: function () {
                        res.json({
                            success: false,
                            message: 'Category not found: ' + req.params.id
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
                            message: 'Category removed successfully: ' + category.id
                        });
                    }
                });
            }
        });
    });

router.get('/type/:type', function (req, res, next) {
    mongoose.model('Categories').find({'type' : req.params.type}, function (err, categories) {
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
        else if (!categories.length) {
            res.status(404);
            res.format({
                json: function () {
                    res.json({
                        success: false,
                        message: 'No categories found.'
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
                        payLoad: categories
                    });
                }
            });
        }
    });
});

module.exports = router;