const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("donate").setDescription("Support the bot developer"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x00ae86)
      .setTitle("💖 Support the Developer")
      .setDescription("If you enjoy using this bot, consider supporting its development!")
      .addFields(
        {
          name: "💳 PayPal Donation",
          value: "[Click here to donate via PayPal](https://paypal.me/jofushudec94)\n`jofushudec94@gmail.com`",
          inline: false,
        },
        {
          name: "⭐ Other Ways to Support",
          value: "• Star the GitHub repository\n• Share the bot with friends\n• Report bugs and suggest features",
          inline: false,
        },
      )
      .setFooter({ text: "Every donation helps keep the bot running!" })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}
