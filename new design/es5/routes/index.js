'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

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


router.get('/', _pages2.default.index);
// router.get('/portfolio/:name', portfolio.index);
// router.get('/portfolio/detail/:name', portfolio.detail);
// router.get('/contact', pages.contact);
// router.get('/blog', blog.index);
// router.get('/blog/:id', blog.posts);

module.exports = router;
//# sourceMappingURL=index.js.map
