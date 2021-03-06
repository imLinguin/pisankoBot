const fetch = require("node-fetch");
const trendingUrl =
  "https://api.tenor.com/v1/trending?key=V37IT23T7QBQ&locale=pl_PL&limit=10";
const randomUrl =
  "http://api.tenor.com/v1/random?key=V37IT23T7QBQ&q=smiech&locale=pl_PL&limit=20";
const { MessageAttachment, MessageFlags } = require("discord.js");
module.exports = {
  name: "gif",
  description: "Sends gifs",
  args: true,
  hidden: false,
  argsWzor: "<trending/random/search/info> <search phrase(if search)>",
  aliases: ["fig"],

  run(message, args, client) {
    switch (args[0]) {
      case "trending":
        Trending(message, args);
        break;
      case "random":
        Random(message);
        break;
      case "search":
        Search(message, args);
        break;
      case "info":
        Info(message);
        break;
      default:
        message.channel.send("Byczq coś ci się argumenty nie ten tego");
        break;
    }
  },
};

async function Trending(msg, args) {
  await fetch(trendingUrl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      //console.log(json.results[0].media[0].tinygif.url)
      try {
        if (!args[1] || !isNaN(args[1])) {
          msg.channel.send(
            json.results[Math.floor(Math.random() * 10 + 1)].media[0].gif.url
          );
        } else {
          msg.channel.send(json.results[args[1]].media[0].gif.url);
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch();
}
async function Random(msg) {
  await fetch(randomUrl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      try {
        msg.channel.send(
          json.results[Math.floor(Math.random() * 20 + 1)].media[0].gif.url
        );
      } catch (err) {
        msg.channel.send("Wystąpił błąd");
      }
      //console.log(pom)
    })
    .catch();
}

async function Search(msg, arg) {
  let tem = arg;
  let tem2 = "";
  tem.shift();
  tem2 = encodeURIComponent(tem);

  const url = `https://api.tenor.com/v1/search?key=${process.env.TENOR}&q=${tem2}&locale=pl_PL&limit=20`;
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then(async (json) => {
      try {
        await msg.channel.send(
          json.results[Math.floor(Math.random() * 20 + 1)].media[0].gif.url
        );
      } catch (err) {
        msg.channel.send("Wystąpił błąd");
      }
    })
    .catch();
}

function Info(msg) {
  msg.reply("Świetne gify dostarcza `TENOR`");
}
