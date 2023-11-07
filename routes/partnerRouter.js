const express = require('express');
const Partner = require('../models/partner');
const authenticate = require('../authenticate');

const partnerRouter = express.Router();

partnerRouter.route('/')
.get((req, res, next) => {
    Partner.find()
    .then(partners => res.status(200).json(partners))
    .catch(err => next(err))
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json(partners);
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(req.body)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err))
        // console.log('Partner Created', partner);
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json(partner);
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
    .then(partners => res.status(200).json(partners))
    .catch(err => next(err))
});

partnerRouter.route('/:partnerId')
.get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err))
})
.post(authenticate.verifyUser, (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Partner.findByIdAndUpdate(req.params.partnerId, req.body, { new: true })
   .then(partner => res.status(200).json(partner))
   .catch(err => next(err))
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err))
});

module.exports = partnerRouter;

/* Instead of having the res. nested, it can go all in one line. More readable.*/