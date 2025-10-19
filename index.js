import { Client, Events, GatewayIntentBits } from "discord.js";
import arenaCommon from "./lib/arenaConfig.js";
import processArenaFeed from "./lib/arenaEmbedFeed.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    await processArenaFeed(channel);
    setInterval(async () => {
      await processArenaFeed(channel);
    }, arenaCommon.interval);
  } else {
    console.log("Channel not found");
  }
});

client.login(process.env.DISCORD_TOKEN);
