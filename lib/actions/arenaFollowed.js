import colors from "../../utils/colors.js";
import { createEmbed } from "../../utils/embed.js";
import arenaBase from "../arenaConfig.js";

export default function followed(story) {
  const blockFieldsCount = () => {
    if (story.item.class === "Channel") {
      return story.item.length;
    } else if (story.item.class === "User") {
      return story.item.channel_count;
    } else {
      return story.item.follower_count;
    }
  };

  return createEmbed({
    title:
      story.item.class === "Group"
        ? story.item.name
        : story.item.title
        ? `${story.item.user.full_name} / ${story.item.title}`
        : story.item.full_name,
    url:
      story.item.class === "Channel"
        ? `${arenaBase.url}${story.item.user.slug}/${story.item.slug}/`
        : `${arenaBase.url}${story.item.slug}/`,
    author: {
      name: story.user.full_name && story.user.full_name,
      iconURL: story.user.avatar_image?.display || undefined,
      url: arenaBase.url + story.user.slug,
    },
    thumbnail:
      story.item.class === "User" && story.item.avatar_image.display !== ""
        ? story.item.avatar_image.display
        : undefined,
    fields:
      story.item.class === "User" || story.item.class === "Channel"
        ? [
            {
              name: story.item.title ? "Blocks" : "Channels",
              value: blockFieldsCount().toString(),
              inline: true,
            },
            {
              name: "Followers",
              value: story.item.follower_count.toString(),
              inline: true,
            },
          ]
        : [],
    description:
      story.item.class === "Group"
        ? story.item.description || undefined
        : story.item.metadata?.description || undefined,
    color: story.item.status ? colors[story.item.status] : undefined,
    timestamp: new Date(story.created_at),
    footer: {
      text: "➡️ Followed",
    },
  });
}
