var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

router.use(function (req, res, next) {
    if (req.body.category && req.method === 'POST') {
        mongoose.model('Categories').findById(req.body.category, function (err, category) {
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
                            message: 'Category not found: ' + req.body.category
                        });
                    }
                });
            }
            else {
                next();
            }
        });
    }
    else if (req.originalUrl.indexOf('category') >= 0 && req.method === 'GET'){
        var id = req.originalUrl.split('category/')[1];
        mongoose.model('Categories').findById(id, function (err, category) {
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
                            message: 'Category not found: ' + id
                        });
                    }
                });
            }
            else {
                next();
            }
        });
    }
    else {
        next();
    }
});

module.exports = router;