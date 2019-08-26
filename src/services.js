var config = require('./config')
var sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'igor_vc@hotmail.com',
        subject: subject,
        html: body
    })
}