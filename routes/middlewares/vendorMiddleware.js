var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

router.use(function (req, res, next) {
    if (req.body.vendor && req.method === 'POST') {
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
                            message: 'Vendor not found: ' + req.body.vendor
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