import arenaFeed from "arena-feed";
import added from "./actions/arenaAdded.js";
import commented from "./actions/arenaCommented.js";
import followed from "./actions/arenaFollowed.js";
import arenaCommon from "./arenaConfig.js";

const ACTION_HANDLERS = {
  added,
  followed,
  "commented on": commented,
};

const CHUNK_SIZE = 10;

export default async function processArenaFeed(channel, executionTime) {
  const arenaPersonalFeed = await arenaFeed(process.env.ARENA_TOKEN);
  const tenMinutesAgo = executionTime
    ? executionTime - arenaCommon.interval
    : Date.now() - arenaCommon.interval;

  const embeds = arenaPersonalFeed.items
    .filter((story) => new Date(story.created_at).getTime() >= tenMinutesAgo)
    .map((story) => ACTION_HANDLERS[story.action]?.(story))
    .filter(Boolean);

  for (let i = 0; i < embeds.length; i += CHUNK_SIZE) {
    await channel
      .send({ embeds: embeds.slice(i, i + CHUNK_SIZE) })
      .catch(console.error, "Embeds:" + embeds);
  }
}
