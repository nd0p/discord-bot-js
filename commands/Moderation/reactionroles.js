const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, Options } = require('discord.js');
const reaction = require('../../Schema/reactionrs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-roles')
        .setDescription('Manage your raction roles system')
        .addSubcommand(command => command.setName('add').setDescription('Add a reaction to a message').addStringOption(option => option.setName('message-id').setDescription('The message to react to').setRequired(true)).addStringOption(option => option.setName('emoji').setDescription('The emoji to react with').setRequired(true)).addRoleOption(option => option.setName('role').setDescription('The role you want to give').setRequired(true)))
        .addSubcommand(command => command.setName('remove').setDescription('remove a reaction from a message').addStringOption(option => option.setName('message-id').setDescription('The message to react to').setRequired(true)).addStringOption(option => option.setName('emoji').setDescription('The emoji to react with').setRequired(true))),
    async execute(interaction) {

        const { options, guild, channel } = interaction;
        const sub = options.getSubcommand();
        const emoji = Options.getString('emoji');

        let e;
        constmessage = await channel.message.fetch(options.getString('message-id')).catch(err => {
            e = err;
        });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `you dont have perms to use this system`, ephemeral: true })
        if (e) return await interaction.reply({ content: `Be sure to get a message from ${channel}!`, ephemeral: true });

        const data = await reaction.findOne({ Guild: guild.id, Message: message.id, Emoji: emoji });

        switch (sub) {
            case 'add':

            if (data) {
                return await interaction.reply({ content: `It looks like you already have this reaction setup using ${emoji} on this message`, ephemeral: true });
            } else {
                const role = options.getRole('role');
                await reaction.create({
                    Guild: guild.id,
                    Message: message.id,
                    Emoji: emoji,
                    Role: role.id
                });

                const embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`I have added a reaction role to ${message.url} with ${emoji} and the role ${role}`)
            
                await message.react(emoji).catch(err => { });
            
                await interaction.reply({ embeds: [embed], ephemeral: true });

            }

            break;
            case 'remove':

            if (!data) {
                return await interaction.reply({ content: `It doesnt look like that reaction role axists`, ephemeral: true });
            } else {
                await reaction.deleteMany({
                    Guild: guild.id,
                    Message: message.id,
                    Emoji: emoji
                });

                const embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`I have removed the reaction role from ${message.url} with ${emoji}`)
                
                await interaction
            }

        }
    }
}