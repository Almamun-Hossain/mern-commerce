const handleAsyncError = require("../middleware/handleAsyncError");
const nodemailer = require("nodemailer");
exports.sendEmail = handleAsyncError(async (options) => {
  const taransporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOption = {
    from: '"Ecommcer Suppiler" <process.env.MAIL_FROM_ADDRESS>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await taransporter.sendMail(mailOption);
});
