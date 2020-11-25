const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const admin = require("firebase-admin");
var moment = require("moment-timezone");
const _ = require("underscore");
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

client.once("ready", () => {
  console.log("Client Started.");
  // client.user.setActivity(`Use ${prefix}help.`)
  // Logg.log('Client Started.');
});

client.login(process.env.TOKEN);
