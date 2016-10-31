'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pages = require('./pages');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import oauth  from 'xoauth2';

var router = _express2.default.Router();
// import portfolio  from './portfolio';
// import blog       from './blog';


router.get('/', _pages.index);
// router.get('/portfolio/:name', portfolio.index);
// router.get('/portfolio/detail/:name', portfolio.detail);
// router.get('/contact', pages.contact);
// router.get('/blog', blog.index);
// router.get('/blog/:id', blog.posts);

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

  var emailMsg = 'Regarding: ' + (req.body.subject || 'N/A') + '<br/><br/>Description: ' + req.body.description + '<br/><br/>Email: ' + req.body.email;

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
      html: 'Dear ' + req.body.name + ',<br/><br/><p>Thank you for your inquiry to Iotopia Solutions Inc. We have receive the following message:</p><blockquote>' + req.body.description + '</blockquote><p>Someone will be in touch in with you shortly.</p> <p>Cheers, <br/><br/>Kianosh Pourian<br/>Principal Partner</p>'
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
