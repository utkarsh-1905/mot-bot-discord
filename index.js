require("dotenv").config();

// https://meme-api.herokuapp.com/gimme API

const { Client, Intents } = require("discord.js");
const fetch = require("node-fetch");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const getRedditData = async (subreddit) => {
  let data;
  if (subreddit.length > 2)
    data = await fetch(`https://meme-api.herokuapp.com/gimme/${subreddit}/1`);
  else data = await fetch(`https://meme-api.herokuapp.com/gimme/1`);
  const res = await data.json();
  return res;
};

client.once("ready", () => {
  console.log("ready");
});

client.on("messageCreate", async (message) => {
  // console.log(message);
  if (message.author.bot) return;
  if (!message.content.startsWith("^")) return;
  if (message.content === "^ping") {
    message.reply(`Hello ${message.author.username}`);
  } else if (message.content === "^help") {
    message.reply(helpReply);
  } else if (message.content === "^meme") {
    const subreddit = await getRedditData(" ");
    // console.log(subreddit);
    let url = subreddit.memes[0].preview[3];
    message.channel.send(url || "404");
  } else if (message.content.startsWith("^")) {
    const subreddit = await getRedditData(message.content.slice(1));
    if (subreddit.code === 404) {
      message.reply(subreddit.message);
    } else {
      let url = subreddit.memes[0].preview[3];
      message.channel.send(url || "404");
    }
  }
});

client.login(process.env.TOKEN);

const helpReply =
  "```Prepend all request with ^\nhelp:Will help you\nmeme:Will give you a meme\n<any subreddit page>: Will return a post from that subreddit```";
