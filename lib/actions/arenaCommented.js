import arenaBase from "../arenaConfig.js";
import createEmbed from "../arenaEmbedFeed.js";

export default function commented(story) {
  console.log("Commented", story);

  return createEmbed({
    author: {
      name: story.user.full_name && story.user.full_name,
      iconURL: story.user.avatar_image.display
        ? story.user.avatar_image.display
        : arenaBase.icon,
      url: `${arenaBase.url}${story.user.slug}`,
    },
    description: story.item.body,
    timestamp: new Date(story.created_at),
    footer: {
      text: "Commented",
    },
  });
}
