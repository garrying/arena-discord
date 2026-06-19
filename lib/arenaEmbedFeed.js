import arenaCommonConfig from "./arenaConfig.js";
import arenaFeed from "./arenaFeed.js";
import buildEmbed from "./feedEmbed.js";

const CHUNK_SIZE = 10;

export default async function processArenaFeed(channel, windowStart) {
  let arenaPersonalFeed;
  try {
    arenaPersonalFeed = await arenaFeed(process.env.ARENA_TOKEN);
  } catch (error) {
    console.error(error.message);
    return;
  }

  const since = windowStart ?? Date.now() - arenaCommonConfig.interval;

  const embeds = arenaPersonalFeed.data
    .filter((story) => new Date(story.created_at).getTime() >= since)
    .map((story) => buildEmbed(story))
    .filter(Boolean);

  for (let i = 0; i < embeds.length; i += CHUNK_SIZE) {
    await channel
      .send({ embeds: embeds.slice(i, i + CHUNK_SIZE) })
      .catch(console.error);
  }
}
