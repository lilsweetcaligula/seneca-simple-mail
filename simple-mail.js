const Nodemailer = require('nodemailer')


function simpleMail(options) {
  const seneca = this
  const transport = Nodemailer.createTransport(options.transport)


  seneca.add('sys:mail,send:mail', async function (msg, reply) {
    if (null == msg.to) {
      return reply(new Error('The "to" arg is required'))
    }

    const { to } = msg


    if (null == msg.subject) {
      return reply(new Error('The "subject" arg is required'))
    }

    const { subject } = msg


    if (null == msg.text) {
      return reply(new Error('The "text" arg is required'))
    }

    const { text } = msg


    if (null == msg.html) {
      return reply(new Error('The "html" arg is required'))
    }

    const { html } = msg


    const email = { to, subject, text, html }
    const sent = await transport.sendMail(email)


    return reply(null, { ok: true, data: { sent } })
  })
}


module.exports = simpleMail

module.exports.defaults = ({ Joi }) => {
  transport: Joi.object()
    .unknown()
    .required()
    .description("Options passed to the Nodemailer's transport constructor")
}

