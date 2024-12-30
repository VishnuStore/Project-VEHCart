const nodemailer = require('nodemailer') 
const SendEmail = async options =>{
    const transport={
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
   const transporter = nodemailer.createTransport(transport);
   const message = {
        from:`${process.env.SMTP_FORM_NAME} <${process.env.SMTP_FORM_EMAIL}>`,
        to:options.Email,
        subject:options.subject,
        text:options.message
   }
  await transporter.sendMail(message)
}
module.exports = SendEmail;