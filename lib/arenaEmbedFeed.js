import arenaFeed from "arena-feed";
import added from "./actions/arenaAdded.js";
import commented from "./actions/arenaCommented.js";
import followed from "./actions/arenaFollowed.js";
import arenaCommon from "./arenaConfig.js";

export default async function processArenaFeed(channel) {
  const arenaPersonalFeed = await arenaFeed(process.env.ARENA_TOKEN);
  const stories = arenaPersonalFeed.items;
  const tenMinutesAgo = Date.now() - arenaCommon.interval;
  const embeds = [];

  stories.forEach((story) => {
    const storyTime = new Date(story.created_at).getTime();
    if (storyTime >= tenMinutesAgo) {
      let embed;
      if (story.action == "added") {
        embed = added(story);
      } else if (story.action == "followed") {
        embed = followed(story);
      } else if (story.action == "commented on") {
        embed = commented(story);
      }

      if (embed) {
        embeds.push(embed);
      }
    }
  });

  for (let i = 0; i < embeds.length; i += 10) {
    const chunk = embeds.slice(i, i + 10);
    await channel.send({ embeds: chunk });
  }
}
