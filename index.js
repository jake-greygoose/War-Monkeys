"use strict";

const dotenv = require("dotenv");
dotenv.config();
const { readdir } = require("fs");
const Discord = require("discord.js");
// const client = new Discord.Client();
const MonkeyClient = require("./Client.js");
const client = new MonkeyClient({
  token: process.env.TOKEN,
  prefix: "!",
});
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

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "war-monkeys",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: "109552806464767246871",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CRT_URL,
  }),
  databaseURL: "https://war-monkeys.firebaseio.com",
});

readdir("./commands/", (err, files) => {
  files.forEach((file) => {
    if (err) {
      console.log(err.stack);
    }
    if (!file.endsWith(".js")) return;
    let command = require(`./commands/${file}`);
    console.log(command.help.name);
    client.commands.set(command.help.name, command);
  });
});

client.once("ready", () => {
  console.log("Client Started.");
  // client.user.setActivity(`Use ${prefix}help.`)
  // Logg.log('Client Started.');
});

client.on("error", console.error);

client.on("warn", console.warn);

client.on("message", (message) => {});

client.on("message", async (message) => {
  if (
    !message.guild ||
    !message.content.startsWith(client.config.prefix) ||
    message.author.bot
  )
    return;
  let args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(" ");
  let command = args.shift().toLowerCase();
  let commandModule = client.commands.get(command);
  if (!commandModule) return;
  commandModule.run(client, message, args);
});

client.login(process.env.TOKEN);
