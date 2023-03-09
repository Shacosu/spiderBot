const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")
module.exports = {
    name: "ping",
    description: "Retorna el ms",
    // devOnly: ,
    permissionsRequired: [PermissionFlagsBits.Administrator],
    callback: (client, interaction) => {
        interaction.reply(`Tienes ${client.ws.ping}ms`)
    }
}