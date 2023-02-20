// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const downloadStatusHelper = require("./utils/download-status");
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
	console.log(`Successfully logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
	if(message.content == "!status") {
		downloadStatusHelper.sendStatusUpdate(message);
	}
})

client.login(process.env.DISCORD_TOKEN);