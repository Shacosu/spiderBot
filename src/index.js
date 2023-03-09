require("dotenv").config();
const eventHandler = require("./handlers/eventHandler")
const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
	intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent
  ],
});

eventHandler(client);

client.login(process.env.BOT_TOKEN);


