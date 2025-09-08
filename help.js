const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Shows all available commands"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("📚 Bot Commands")
      .setDescription("Here are all the available commands:")
      .addFields(
        { name: "/ping", value: "Check bot latency and response time", inline: true },
        { name: "/help", value: "Show this help message", inline: true },
        { name: "/donate", value: "Support the bot developer", inline: true },
      )
      .setFooter({ text: "Thank you for using our bot!" })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}
