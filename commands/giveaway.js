"use strict";
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, admin, _, moment) => {
  console.log("Giveaway Command");
  const roles = [
    {"Role": "Tree-Top Casanova", "Weight": 5},
    {"Role": "Circus Tramp", "Weight": 7},
    {"Role": "Jugglin Gigolo", "Weight": 9},
    {"Role": "Swingland Daddy", "Weight": 11},
    {"Role": "Nanner Nympho", "Weight": 13}
    ]
    let out = [];
    let gtime = moment().tz('America/Chicago').format()
    let giving = message.member.user.username
  if(message.member.roles.cache.find(r => r.name === "War Chief") || message.member.roles.cache.find(r => r.name === "War Priest") || message.member.roles.cache.find(r => r.name === "Warlord") || message.member.roles.cache.find(r => r.name === "Commander")) {
    if(args[0] === "here"){

      if(message.member.voice.channel){
        console.log(`Creating giveaway, limiting participants to ${message.member.voice.channel.name}`)
        var contestants = message.member.voice.channel.members
        // Loop through the master entries.
        for (let i = 0; i < roles.length; ++i) {
          let membersWithRole = contestants.filter(member => {
              return member.roles.cache.find(r => r.name === roles[i].Role) && member.roles.cache.find(r => r.name === "Monkey");
          }).map(member => {
              return member.user
          })
          membersWithRole.forEach(function(item) {
            if(item.username !== giving){
              for (let j = 0; j < roles[i].Weight; ++j) {
                  out.push(item);
              }
            }
          });
        }
      } else { return message.channel.send('You must be in a Discord channel to run this command.')}
    
    } else {      
      // Loop through the master entries.
      for (let i = 0; i < roles.length; ++i) {

      let membersWithRole = message.guild.members.cache.filter(member => {
        return member.roles.cache.find(r => r.name === roles[i].Role) && member.roles.cache.find(r => r.name === "Monkey");
      }).map(member => {
          return member.user
      })
      membersWithRole.forEach(function(item) {
          if(item.username !== giving){
            for (let j = 0; j < roles[i].Weight; ++j) {
                out.push(item);
            }
          }
      });


      }
    }

    let winner = out[Math.floor(Math.random() * out.length)]
    let avatar = `https://cdn.discordapp.com/avatars/${winner.id}/${winner.avatar}.png`
    const ResponseEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('MONK Giveaway')
    .setDescription((winner.toString()) + "\n You won the giveaway 🎉🎉🎉 \n")
    .setThumbnail(avatar)
    //.setThumbnail('https://i.imgur.com/0zTCMIE.png')
    .setTimestamp()

    console.log(`Giveaway created by ${giving} won by ${winner.username} at ${gtime}`)

    winner.send(`**${winner.username}, \n 🎉🎉🎉 You won the giveaway 🎉🎉🎉** \n giveaway created by ${giving}`);
    return message.channel.send(ResponseEmbed).then(sentMessage => {
          sentMessage.react('🎉');
    });

  } else {

    message.channel.send('Insufficient Permissions. Officer / Commander Rank Required.')

  }
};

module.exports.help = {
  name: "giveaway",
  description: "",
};
