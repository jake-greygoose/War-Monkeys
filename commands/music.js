"use strict";
const { createReadStream } = require("fs");
module.exports.run = async (client, message, args, admin, _) => {
  console.log("Music Bot On");

  if (message.member.voice.channel) {
    console.log(message.member.voice.channel)
    message.member.voice.channel.join()
    .then(connection => {
        const dispatcher = connection.play(createReadStream('LoFi 30min.opus'), { type: 'ogg/opus', volume: 0.5});
        dispatcher.on("end", end => {message.member.voice.channel.leave()});
    })
  }


};

module.exports.help = {
  name: "music",
  description: "",
};
