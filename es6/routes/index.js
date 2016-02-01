'use strict';

import express    from 'express';
import pages      from './pages';
import portfolio  from './portfolio';
import blog       from './blog';
import fs         from 'fs';
import mailer     from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
// import oauth  from 'xoauth2';

let router = express.Router();

router.get('/', pages.index);
router.get('/portfolio/:name', portfolio.index);
router.get('/portfolio/detail/:name', portfolio.detail);
router.get('/contact', pages.contact);
router.get('/blog', blog.index);
router.get('/blog/:id', blog.posts);

// let generator = oauth.createXOAuth2Generator({
//   clientId: '478084717843-ur43h88t1mpc71ss8pn5g08a414j0ho9.apps.googleusercontent.com',
//   clientSecret: 'g8y2BGQhCGpKOge66rzZc7xu',
//   refreshToken: '1/w1AJNkOERoqJSIN9rwfNaaSJ8w94k-NKV9UjvUkoZi0'
// });

router.post('/email', (req, res) => {
  let returnObj = {
      result: 'sent'
  };

  let gmailTransport = mailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      // xoauth2: generator
      user: 'info@cieloconcepts.com',
      pass: 'C!eloC0ncepts2015'
    }
  }));

  let emailMsg = req.body.description + '<br/><br/>contact email: ' + req.body.email;
  emailMsg += '<br/><br/>website: ' + (req.body.url || 'N/A');

  console.log(emailMsg);

  gmailTransport.sendMail({
    to: 'Cielo Concepts Inc <info@cieloconcepts.com>',
    subject: 'Inquiry from ' + req.body.name,
    html: emailMsg
  }, (err, info) => {
    if (err) {
      console.log(err);
      returnObj.result = 'fail';
      res.send(returnObj);
    }

    gmailTransport.sendMail({
      from: 'Cielo Concepts Inc <info@cieloconcepts.com>',
      to: req.body.email,
      subject: 'Thank you for your inquiry',
      html: 'Dear ' + req.body.name + ',<br/><br/><p>Thank you for your inquiry to Cielo Concepts Inc. We have receive the following message:</p><blockquote>' + req.body.description + '</blockquote><p>Someone will be in touch in with you shortly.</p> <p>Cheers, <br/><br/>Kianosh Pourian<br/>CEO and President</p>' 
    }, (err, info) => {
        console.log(info);
      if (err) {
          returnObj.result = 'fail';
      }

      res.send(returnObj);
    })
  });  
});

module.exports = router;