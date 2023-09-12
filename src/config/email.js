module.exports = {
  // defaults to be passed to nodemailer's emails
  defaults: {
    from: 'template <template@example.org>',
  },

  provider: {

    // auth data always from ENV vars
    auth: {
      pass: process.env.SENDGRID_PASS,
      user: process.env.SENDGRID_USER,
    },

    // your provider name directly or from ENV var
    service: 'SendGrid',
  },
};
