// This is a composition plan for the service that handles the email endpoint.
import { createTransport } from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import compile from '../template/compile'
import requireText from '../requireText'
import nodeToPromise from '../nodeToPromise'

const requireTemplate = requireText(__dirname)
const inquiryHtml = requireTemplate('./inquiryMessage.html')
const thankyouHtml = requireTemplate('./thankyouMessage.html')

// Handles a POST request to the /email endpoint.
export default
  ({ email }) => {

    const { service, user, pass } = email
    const gmailTransport
      = createTransport(smtpTransport({ service, auth: { user, pass } }))
    const sendMailP = nodeToPromise(msg => gmailTransport.sendMail(msg))
    const renderInquiry = compile(inquiryHtml)
    const renderConfirm = compile(thankyouHtml)
    const renderInquirySubject = compile('Inquiry from ${name}')
    const renderConfirmSubject = compile('Thank you for your inquiry')

    return (req, res) => {
      const { service, user, pass } = email

      const data = formData(req.body)

      // TODO: put more of these values into config
      // TODO: sanitize form input (description, subject)
      const msgToUs
        = {
          to: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
          from: 'Iotopia Web Inquiry <hello@iotopia-solutions.com>',
          subject: renderInquirySubject(data),
          html: renderInquiry(data)
        }

      const msgToThem
        = {
          from: 'Iotopia Solutions Inc <hello@iotopia-solutions.com>',
          to: data.email,
          subject: renderConfirmSubject(data),
          html: renderConfirm(data)
        }

      const inquiryP = sendMailP(msgToUs)
      const confirmP = sendMailP(msgToThem)

      // TODO: log errors
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

const formData
  = ({ subject, description, email, name }) =>
    ({
      name,
      subject: subject || 'N/A',
      description,
      email
    })
