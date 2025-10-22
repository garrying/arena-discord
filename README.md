# Are.na Discord

A Discord bot that automatically shares content from an Are.na user's feed to a Discord channel.

## Setup

1. Create your Discord application using the [Discord developer portal](https://discord.com/developers/applications)
2. Invite your application to the server by generating an OAuth2 URL with `bot` and `applications.commands` options selected
3. Generate a token for `DISCORD_TOKEN` in the Bot section of your application
4. Register a new application on Are.na at [dev.are.na](https://dev.are.na/), and get the `Personal Access Token` (`ARENA_TOKEN`)
5. Copy the Channel ID from Discord (`CHANNEL_ID`)
6. Add `ARENA_TOKEN`,`DISCORD_TOKEN`, `CHANNEL_ID` environment variables
7. Run using `pm2`

### Environment Variables

| Variable        | Description                                               |
| --------------- | --------------------------------------------------------- |
| `ARENA_TOKEN`   | Your Are.na Personal Access Token for API authentication  |
| `DISCORD_TOKEN` | Your Discord bot token for authentication                 |
| `CHANNEL_ID`    | The Discord channel ID where Arena updates will be posted |

## License

GNU General Public License v3.0.