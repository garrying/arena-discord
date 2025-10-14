import followed from "./lib/arenaFollowed.js";

import arenaFeed from "arena-feed";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const arenaPersonalFeed = await arenaFeed(process.env.ARENA_TOKEN);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const stories = arenaPersonalFeed.items;

  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    stories.forEach((story) => {
      if (story.action == "added") {
        // added();
      } else if (story.action == "followed") {
        const embed = followed(story);
        channel.send({ embeds: [embed] });
      } else if (story.action == "commented on") {
        // commented();
      }
    });
  } else {
    console.log("Channel not found");
  }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
