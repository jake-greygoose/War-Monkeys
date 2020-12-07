"use strict";
const dotenv = require("dotenv");
dotenv.config();
const { readdir } = require("fs");
const MonkeyClient = require("./Client.js");
const client = new MonkeyClient({
  token: process.env.TOKEN,
  prefix: "!",
});
const admin = require("./FirebaseAdmin.js");
const loggly = require("./Loggly.js");
var moment = require("moment-timezone");
const _ = require("underscore");

readdir("./commands/", (err, files) => {
  files.forEach((file) => {
    if (err) {
      console.log(err.stack);
    }
    if (!file.endsWith(".js")) return;
    let command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
  });
});

client.once("ready", () => {
  console.log("Client Started.");
  loggly.log("Client Started.");
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
  commandModule.run(client, message, args, admin, _, moment);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  let ctime = moment().tz("America/Chicago").format();
  if (newState.member.user.bot) return;
  if (oldState.channelID === newState.channelID) {
    console.log("reconnected");
    return;
  }
  const OpenRaidChannel = newState.guild.channels.cache.find(
    (c) => c.name === "Open Squad"
  );
  const ClosedRaidChannel = newState.guild.channels.cache.find(
    (c) => c.name === "Kong Isle {Closed Squad}"
  );
  const SocialChannel = newState.guild.channels.cache.find(
    (c) => c.name === "Generally Social"
  );

  // User Left Discord
  if (oldState.channelID && !newState.channelID) {
    console.log(
      `${oldState.member.user.username} Left ${oldState.channel.name} at ${ctime}`
    );
    loggly.log(
      `${oldState.member.user.username} Left ${oldState.channel.name} at ${ctime}`
    );
    // Competitive Channel disconnected
    if (
      oldState.channelID === OpenRaidChannel.id ||
      oldState.channelID === ClosedRaidChannel.id
    ) {
    }
    // Social Channel disconnected
    if (oldState.channelID === SocialChannel.id) {
    }
  }
  // Competitive Channel Connected
  else if (
    newState.channelID === OpenRaidChannel.id ||
    newState.channelID === ClosedRaidChannel.id
  ) {
  }
  // Social Channel Connected
  else if (newState.channelID === SocialChannel.id) {
  }
});

client.login(process.env.TOKEN);
