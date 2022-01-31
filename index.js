require('dotenv').config();

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const fetch = require("node-fetch");

client.once('ready',()=>{
        console.log('ready');
})

client.on("messageCreate", (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith('^')) return;
  if(message.content === "!ping"){
          message.reply(`Hello ${message.author.username}`);
  }
});

client.login(process.env.TOKEN);
