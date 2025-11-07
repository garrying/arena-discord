import { createEmbed } from "../../utils/embed.js";
import arenaBase from "../arenaConfig.js";

export default function commented(story) {
  return createEmbed({
    author: {
      name: story.item.user.full_name,
      iconURL: story.item.user.avatar_image?.display || undefined,
      url: arenaBase.url + story.item.user.slug,
    },
    thumbnail: story.target.image?.thumb?.url,
    title: `${story.parent.title} / ${story.target.title || "No title"}`,
    url:
      story.target.base_class === "Block"
        ? `${arenaBase.url}block/${story.target.id}/`
        : `${arenaBase.url}${story.parent.owner_slug}/${story.parent.slug}`,
    description:
      story.target.class === "Text"
        ? `${story.item.body}\n\n> ${story.target.content}`
        : story.item.body,
    timestamp: new Date(story.created_at),
    footer: {
      text: "💬 Commented",
    },
  });
}
