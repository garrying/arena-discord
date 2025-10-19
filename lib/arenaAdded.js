import arenaBase from "./arenaCommon.js";
import { createEmbed } from "./embed.js";

export default function added(story) {
  console.log("Connected block", story);

  return createEmbed({
    title: story.item.title
      ? `${story.target.title} / ${story.item.title}`
      : `${story.item.full_name}`,
    url: `${arenaBase.url}block/${story.item.id}/`,
    author: {
      name: story.user.full_name && story.user.full_name,
      iconURL: story.user.avatar_image.display
        ? story.user.avatar_image.display
        : arenaBase.icon,
      url: `${arenaBase.url}${story.user.slug}`,
    },
    image: story.item.image.original.url,
    timestamp: new Date(story.created_at),
    footer: {
      text: "Connected",
    },
  });
}
