require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { CommandKit } = require('commandkit');
const { CommandHandler } = require('djs-commander');
const mongoose = require('mongoose');
const path = require('path');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    validationsPath: path.join(__dirname, 'validations'),
    testServer: '1101080578184466442',
});

new CommandKit({
    client,
    commandsPath: `${__dirname}/commands`,
    eventsPath: `${__dirname}/events`,
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB.");

        client.login(process.env.TOKEN);

        eventHandler(client);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();
