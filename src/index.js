require("dotenv").config();
const renderTex = require("./latex-command");

const { Client, IntentsBitField, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is now online.`);

  client.user.setActivity({
    name: " for ```DiscoTeX",
    type: ActivityType.Watching,
  });
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.startsWith("```DiscoTeX")) {
    startStr = "```DiscoTeX";
    pos = msg.content.indexOf(startStr) + startStr.length;
    let msgTex = msg.content.substring(pos, msg.content.indexOf("```", pos));

    try {
      let texImage = await renderTex(msgTex);
      msg.channel.send({
        content: "",
        files: [
          {
            attachment: Buffer.from(texImage, "base64"),
            name: "texScreenshot.png",
          },
        ],
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  }
});

client.login(process.env.TOKEN);
