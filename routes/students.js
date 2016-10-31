var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Students = require('../models/students');


router.get('/static', function(req, res, next) {
        res.json( [
             {
      "name": "Luke Skywalker",
      "schoolName": "172",
      "standard": "77",
      "url": "http://swapi.co/api/students/1/"
    },
    {
      "name": "C-3PO",
      "schoolName": "167",
      "standard": "75",
      "url": "http://swapi.co/api/students/2/"
    },
    {
      "name": "R2-D2",
      "schoolName": "96",
      "standard": "32",
      "url": "http://swapi.co/api/students/3/"
    }
     ])
 
});

router.get('/', function(req, res, next) {
    Students.find()
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});


router.get('/:id', function(req, res, next) {
    Students.findById(req.params.id)
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.post('/', function(req, res, next) {
        var students = new Students({
            url         : req.body.url,
            name        : req.body.name,
            schoolName      : req.body.schoolName,
            standard      : req.body.standard            
           });
        students.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
});



router.post('/:id', function(req, res, next) {
    Students.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No message found',
                error: {message: 'Message could not be found'}
            });
        }
        console.log("Mongo Record before update .... "+doc);
        console.log("Request Body from Browser .... "+req.body);
//        console.log(decoded.user);
//        if (doc.user != decoded.user._id) {
//            return res.status(401).json({
//                title: 'Not Authorized',
//                error: {message: 'Message created by other user'}
//            });
//        }
        doc.url = req.body.url;
        doc.name = req.body.name;
        doc.schoolName = req.body.schoolName;
        doc.standard = req.body.standard;        
        
        doc.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Authentication failed',
                error: err
            });
        }
        next();
    });
});



module.exports = router;