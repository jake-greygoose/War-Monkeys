"use strict";
const loggly = require("loggly");

var Logg = loggly.createClient({
  token: process.env.LOGGLY_TOKEN,
  subdomain: "warmonkeys",
  auth: {
    username: "warmonkeys",
    password: process.env.LPASS,
  },
  //
  // Optional: Tag to send with EVERY log message
  //
  tags: ["global-tag"],
});

module.exports = Logg;
