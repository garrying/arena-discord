import arenaCommonConfig from "./arenaConfig.js";
import arenaFeed from "./arenaFeed.js";
import buildEmbed, { buildConnectedEmbed } from "./feedEmbed.js";

const CHUNK_SIZE = 10;

// Collapse consecutive blocks connected to the same channel by the same actor
// into a single run so a batch add renders as one embed instead of many.
function groupConnections(stories) {
  const runs = [];
  for (const story of stories) {
    const last = runs[runs.length - 1];
    if (
      story.kind === "added_block_to_channel" &&
      last?.[0].kind === "added_block_to_channel" &&
      last[0].actor.id === story.actor.id &&
      last[0].target?.id === story.target?.id
    ) {
      last.push(story);
    } else {
      runs.push([story]);
    }
  }
  return runs;
}

export default async function processArenaFeed(channel, windowStart) {
  let arenaPersonalFeed;
  try {
    arenaPersonalFeed = await arenaFeed(process.env.ARENA_TOKEN);
  } catch (error) {
    console.error(error.message);
    return;
  }

  const since = windowStart ?? Date.now() - arenaCommonConfig.interval;

  const fresh = arenaPersonalFeed.data
    .filter((story) => new Date(story.created_at).getTime() >= since)
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  const embeds = groupConnections(fresh)
    .map((run) => (run.length > 1 ? buildConnectedEmbed(run) : buildEmbed(run[0])))
    .filter(Boolean);

  for (let i = 0; i < embeds.length; i += CHUNK_SIZE) {
    await channel
      .send({ embeds: embeds.slice(i, i + CHUNK_SIZE) })
      .catch(console.error);
  }
}
