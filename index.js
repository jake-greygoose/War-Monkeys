const dotenv = require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const admin = require("firebase-admin");
var moment = require('moment-timezone');
const _ = require('underscore');
const loggly = require('loggly');

 client.once('ready', () => {
   
   console.log('Test')
    //client.user.setActivity(`Use ${prefix}help.`)
   //Logg.log('Client Started.');
 
 
 });

 client.login(process.env.TOKEN);