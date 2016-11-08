// This is a composition plan for the service that handles the email endpoint.
import { createTransport } from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import compile from '../template/compile'
import requireText from '../requireText'
import nodeToPromise from '../nodeToPromise'
import { fromString as toText } from 'html-to-text'

const requireTemplate = requireText(__dirname)
const inquiryHtml = requireTemplate('./inquiryMessage.html')
const thankyouHtml = requireTemplate('./thankyouMessage.html')

// Handles a POST request to the /email endpoint.
export default
  ({ email }) => {

    const { service, user, pass } = email

    const gmailTransport
      = createTransport(smtpTransport({ service, auth: { user, pass } }))
    // TODO: According to the nodemailer 2.x docs, sendMail will return a promise if the callback is omitted
    const sendMailP = nodeToPromise(msg => gmailTransport.sendMail(msg))
    const emailData = formToEmailData(toText)
    
    const renderInquiryHtml = compile(inquiryHtml)
    const renderConfirmHtml = compile(thankyouHtml)
    const renderInquiryText = compile(toText(inquiryHtml))
    const renderConfirmText = compile(toText(thankyouHtml))
    const renderInquirySubject = compile('Inquiry from ${name}')
    const renderConfirmSubject = compile('Thank you for your inquiry')

    return (req, res) => {

      // Prepare and sanitize data
      const data = emailData(req.body)

      // TODO: put more of these values into config
      const msgToIotopia
        = {
          to: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
          from: 'Iotopia Web Inquiry <hello@iotopia-solutions.com>',
          subject: renderInquirySubject(data),
          html: renderInquiryHtml(data),
          text: renderInquiryText(data)
        }

      const msgToUser
        = {
          to: data.email,
          from: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
          subject: renderConfirmSubject(data),
          html: renderConfirmHtml(data),
          text: renderConfirmText(data)
        }

      const inquiryP = sendMailP(msgToIotopia)
      const confirmP = sendMailP(msgToUser)

      return Promise.all([ inquiryP, confirmP ])
        .then(results => {
          console.log('emails sent')
          res.send({ result: 'sent' })
        })
        .catch(err => {
          console.error(err, err && err.stack)
          res.send({ result: 'fail' })
        })
    }
  }

const formToEmailData
  = sanitize => ({ subject, description, email, name }) =>
    ({
      name: sanitize(name),
      subject: subject ? sanitize(subject) : 'N/A',
      description: sanitize(description),
      email: sanitize(email)
    })
