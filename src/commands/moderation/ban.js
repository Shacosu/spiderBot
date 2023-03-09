const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")

module.exports =  {
    name: "ban",
    description: "Retorna el ms",
    // devOnly: ,
    options: [{
        name: "nombre",
        description: "Usuario a banear.",
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
    },
    {
        name: "razón",
        description: "Razón del baneo",
        type: ApplicationCommandOptionType.String,
    }
],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    callback: (client, interaction) => {
        interaction.reply(`Has baneado a ${client.user.tag}`)
    }
}