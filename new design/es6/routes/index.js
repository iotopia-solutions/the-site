'use strict';

import express    from 'express';
import pages      from './pages';
// import portfolio  from './portfolio';
// import blog       from './blog';
import fs         from 'fs';
import mailer     from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
// import oauth  from 'xoauth2';

let router = express.Router();

router.get('/', pages.index);
// router.get('/portfolio/:name', portfolio.index);
// router.get('/portfolio/detail/:name', portfolio.detail);
// router.get('/contact', pages.contact);
// router.get('/blog', blog.index);
// router.get('/blog/:id', blog.posts);

module.exports = router;