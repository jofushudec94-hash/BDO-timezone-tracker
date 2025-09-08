const { Client, GatewayIntentBits, Collection, Events } = require("discord.js")
const fs = require("fs")
const path = require("path")

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

// Create a collection for commands
client.commands = new Collection()

// Load command files
const commandsPath = path.join(__dirname, "commands")
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

// Load event files
const eventsPath = path.join(__dirname, "events")
if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"))

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
  }
}

// Ready event
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

// Interaction handling
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true })
    } else {
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
    }
  }
})

// Message handling for prefix commands
client.on(Events.MessageCreate, async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return

  // Check if message starts with !timezone
  if (message.content.toLowerCase().startsWith("!timezone")) {
    try {
      const now = new Date()

      // Get current times for different zones
      const localTime = now.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
      const pstTime = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
      const estTime = now.toLocaleString("en-US", { timeZone: "America/New_York" })
      const ukTime = now.toLocaleString("en-US", { timeZone: "Europe/London" })
      const belgiumTime = now.toLocaleString("en-US", { timeZone: "Europe/Brussels" })

      const embed = {
        color: 0x0099ff,
        title: "🌍 Current Time Zones",
        description: "Perfect for planning Discord events across regions!",
        fields: [
          {
            name: "🇺🇸 PST (Pacific)",
            value: pstTime,
            inline: true,
          },
          {
            name: "🇺🇸 EST (Eastern)",
            value: estTime,
            inline: true,
          },
          {
            name: "🇬🇧 UK (London)",
            value: ukTime,
            inline: true,
          },
          {
            name: "🇧🇪 Belgium (Brussels)",
            value: belgiumTime,
            inline: true,
          },
          {
            name: "🌐 Server Time",
            value: localTime,
            inline: true,
          },
        ],
        footer: {
          text: "Use this for coordinating events • Support: PayPal jofushudec94@gmail.com",
        },
        timestamp: now.toISOString(),
      }

      await message.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error in !timezone command:", error)
      await message.reply("❌ Sorry, there was an error getting the timezone information.")
    }
  }
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
