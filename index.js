import arenaFeed from "arena-feed";
import { Client, Events, GatewayIntentBits } from "discord.js";
import added from "./lib/arenaAdded.js";
import commented from "./lib/arenaCommented.js";
import followed from "./lib/arenaFollowed.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const arenaPersonalFeed = await arenaFeed(process.env.ARENA_TOKEN);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  const stories = arenaPersonalFeed.items;

  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

    stories.forEach((story) => {
      const storyTime = new Date(story.created_at).getTime();
      if (storyTime >= tenMinutesAgo) {
        if (story.action == "added") {
          const embed = added(story);
          channel.send({ embeds: [embed] });
        } else if (story.action == "followed") {
          const embed = followed(story);
          channel.send({ embeds: [embed] });
        } else if (story.action == "commented on") {
          const embed = commented(story);
          channel.send({ embeds: [embed] });
        }
      }
    });
  } else {
    console.log("Channel not found");
  }
});

client.login(process.env.DISCORD_TOKEN);
