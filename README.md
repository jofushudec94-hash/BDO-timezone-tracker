# BDO-timezone-tracker
This is the coding for a bot tracker that keeps track of times in CST, EST, PST, UK, and Polish timezones for the purpose of planning events on Discord


# Discord Event Planner Bot

A powerful Discord bot designed for event planning with multi-timezone support. Perfect for coordinating events across different time zones with an integrated web dashboard.

## Features

- 🌍 **Multi-Timezone Support**: Display time in multiple zones (Local, PST, EST, UK, Belgium)
- 📅 **Event Planning**: Built-in event coordination tools
- 🎯 **Slash Commands**: Modern Discord slash command interface
- 📊 **Web Dashboard**: Beautiful time zone tracker web interface
- ⚡ **Real-time Updates**: Live time synchronization
- 💖 **Open Source**: Free to use and modify

## Bot Commands

- `/ping` - Check bot latency and response time
- `/help` - Show all available commands
- `/donate` - Support the bot developer

## Quick Setup

### Prerequisites

- Node.js 16.9.0 or higher
- A Discord application and bot token
- Git (for cloning)

### Installation

1. **Clone the repository**
   git clone https://github.com/yourusername/discord-event-planner-bot.git
   cd discord-event-planner-bot

2. **Install dependencies**
   npm install

3. **Environment Setup**
   Create a `.env` file in the root directory:
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_application_id_here

4. **Deploy Commands**
   npm run deploy-commands

5. **Start the Bot**
   npm run bot

6. **Start Web Dashboard** (Optional)
   npm run dev

## Getting Your Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section
4. Create a bot and copy the token
5. Copy your Application ID from the "General Information" section

## Inviting the Bot

Use this link to invite the bot to your server):

https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=2048&scope=bot%20applications.commands


## Web Dashboard

The bot includes a beautiful web dashboard for time zone tracking. Access it at `http://localhost:3000` when running the development server.

## Support the Developer

If you find this bot useful, consider supporting its development:

💳 **PayPal**: [jofushudec94@gmail.com](https://paypal.me/jofushudec94)

Other ways to support:
- ⭐ Star this repository
- 🐛 Report bugs and suggest features
- 📢 Share with friends

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

**Bot not responding to commands:**
- Ensure the bot has the necessary permissions in your server
- Check that commands are deployed with `npm run deploy-commands`
- Verify your bot token is correct

**Environment variables not loading:**
- Make sure your `.env` file is in the root directory
- Restart the bot after making changes to `.env`

**Need help?** Open an issue on GitHub or contact jofushudec94@gmail.com

---

Made with ❤️ for the Discord community
