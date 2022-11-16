const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_EMAIL, SENDGRID_API_KEY } = process.env

console.log(SENDGRID_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = (to, templateId, dynamicTemplateData) => new Promise((resolve, reject) => {
    let msg = {
        to: to,
        from: {
            email: SENDGRID_EMAIL,
            name: 'MANAGY'
        },
        templateId: templateId,
        dynamicTemplateData: dynamicTemplateData
    }
    sgMail.send(msg).then((results) => { resolve("Email sent successfully") }, error => {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    });
});

module.exports = { sendMail }