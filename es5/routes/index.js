'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _portfolio = require('./portfolio');

var _portfolio2 = _interopRequireDefault(_portfolio);

var _blog = require('./blog');

var _blog2 = _interopRequireDefault(_blog);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import oauth  from 'xoauth2';

var router = _express2.default.Router();

router.get('/', _pages2.default.index);
router.get('/portfolio/:name', _portfolio2.default.index);
router.get('/portfolio/detail/:name', _portfolio2.default.detail);
router.get('/contact', _pages2.default.contact);
router.get('/blog', _blog2.default.index);
router.get('/blog/:id', _blog2.default.posts);

// let generator = oauth.createXOAuth2Generator({
//   clientId: '478084717843-ur43h88t1mpc71ss8pn5g08a414j0ho9.apps.googleusercontent.com',
//   clientSecret: 'g8y2BGQhCGpKOge66rzZc7xu',
//   refreshToken: '1/w1AJNkOERoqJSIN9rwfNaaSJ8w94k-NKV9UjvUkoZi0'
// });

router.post('/email', function (req, res) {
  var returnObj = {
    result: 'sent'
  };

  var gmailTransport = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
    service: 'gmail',
    auth: {
      // xoauth2: generator
      user: 'hello@iotopia-solutions.com',
      pass: 'uSyiKT;d49=:rXb.'
    }
  }));

  var emailMsg = req.body.description + '<br/><br/>contact email: ' + req.body.email;
  emailMsg += '<br/><br/>website: ' + (req.body.url || 'N/A');

  console.log(emailMsg);

  gmailTransport.sendMail({
    to: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
    subject: 'Inquiry from ' + req.body.name,
    html: emailMsg
  }, function (err, info) {
    if (err) {
      console.log(err);
      returnObj.result = 'fail';
      res.send(returnObj);
    }

    gmailTransport.sendMail({
      from: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
      to: req.body.email,
      subject: 'Thank you for your inquiry',
      html: 'Dear ' + req.body.name + ',<br/><br/><p>Thank you for your inquiry to Iotopia Solutions Inc. We have receive the following message:</p><blockquote>' + req.body.description + '</blockquote><p>Someone will be in touch in with you shortly.</p> <p>Cheers, <br/><br/>Kianosh Pourian<br/>CEO and President</p>'
    }, function (err, info) {
      console.log(info);
      if (err) {
        returnObj.result = 'fail';
      }

      res.send(returnObj);
    });
  });
});

module.exports = router;
//# sourceMappingURL=index.js.map
