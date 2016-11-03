'use strict';

import express from 'express';
import indexService from './index/service';
import fs         from 'fs';
import compile from './template/compile';
import mailer     from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { join } from 'path';

const router = express.Router();

// TODO: refactor app so this can be async.
const indexHtml = fs.readFileSync(join(__dirname, 'index/index.html'), 'utf8');

router.get('/', indexService(compile(indexHtml)));

// TODO: move this code into its own component.
router.post('/email', (req, res) => {
  let returnObj = {
      result: 'sent'
  };

  let gmailTransport = mailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      // xoauth2: generator
      user: 'hello@iotopia-solutions.com',
      pass: 'uSyiKT;d49=:rXb.'
    }
  }));

  let emailMsg = 'Regarding: ' + (req.body.subject || 'N/A') + '<br/><br/>Description: ' + req.body.description + '<br/><br/>Email: ' + req.body.email;

  console.log(emailMsg);

  gmailTransport.sendMail({
    to: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
    subject: 'Inquiry from ' + req.body.name,
    html: emailMsg
  }, (err, info) => {
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
    }, (err, info) => {
        console.log(info);
      if (err) {
          returnObj.result = 'fail';
      }

      res.send(returnObj);
    })
  });
});

export default router;
