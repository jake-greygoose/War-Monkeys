"use strict";
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, admin, _, moment) => {
  var db = admin.database();
  db.ref("/users/")
    .orderByChild("totalRaidDuration")
    .limitToLast(10)
    .once("value")
    .then(function (snapshot) {
      let snap = Object.values(snapshot.val());
      return _.sortBy(snap, "totalRaidDuration").reverse();
    })
    .then((users) => {
      var ResponseEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Leaderboard")
        .setDescription("Highest Guild Raid Attendance & Social Discord Use.")
        .setThumbnail("https://i.imgur.com/0zTCMIE.png")
        .setTimestamp()
        .addFields(
          {
            name: "Name",
            value: users.map((user) => user.username).join(" \n"),
            inline: true,
          },
          {
            name: "Raid",
            value: users
              .map((user) => {
                if (user.totalRaidDuration) {
                  let h = Math.floor(user.totalRaidDuration / 3600)
                    .toString()
                    .padStart(2, "0");
                  let m = Math.floor((user.totalRaidDuration % 3600) / 60)
                    .toString()
                    .padStart(2, "0");
                  let s = Math.floor(user.totalRaidDuration % 60)
                    .toString()
                    .padStart(2, "0");
                  return h + ":" + m + ":" + s;
                } else {
                  return "00:00:00";
                }
              })
              .join(" \n"),
            inline: true,
          },
          {
            name: "Social",
            value: users
              .map((user) => {
                if (user.totalSocialDuration) {
                  let h = Math.floor(user.totalSocialDuration / 3600)
                    .toString()
                    .padStart(2, "0");
                  let m = Math.floor((user.totalSocialDuration % 3600) / 60)
                    .toString()
                    .padStart(2, "0");
                  let s = Math.floor(user.totalSocialDuration % 60)
                    .toString()
                    .padStart(2, "0");
                  return h + ":" + m + ":" + s;
                } else {
                  return "00:00:00";
                }
              })
              .join(" \n"),
            inline: true,
          }
        );

      return message.channel.send(ResponseEmbed);
    });
};

module.exports.help = {
  name: "leaderboard",
  description: "",
};
