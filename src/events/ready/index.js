const { ActivityType, EmbedBuilder  } = require("discord.js")
const { getInfo } = require("../../scraping/getRacionalInfo")


module.exports = async (client) => {
    console.log(`${client.user.tag} en linea! `)
    setInterval(async () => {
        const { currentPrice, info: { investInfo, isMarketOpen} } = await getInfo();
        client.user.setActivity({
            name: currentPrice.toString(),
            type: ActivityType.Watching
        })
        client.user.setStatus(isMarketOpen ? "online" : "dnd");
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Información Racional')
        .setURL('https://app.racional.cl/tabs/home')
        .setAuthor({ name: 'Shacosu'})
        .setDescription('Estado de racional el dia de hoy')
        .addFields({ name: "Inversion Actual", value: currentPrice.toString(), inline: true })
        .addFields({ name: "Porcentaje (%)", value: investInfo.toString(), inline: true })
        .addFields({ name: "Estado del mercado", value: isMarketOpen ? "Abierto" : "Cerrado", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creado por Shacosu' });
        client.channels.cache.get('1083300936165883924').send({ embeds: [exampleEmbed] });

    }, 21600000)
    
};