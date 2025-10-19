import { createEmbed } from "../../utils/embed.js";
import arenaBase from "../arenaConfig.js";

export default function added(story) {
  console.log("Connected block", story);

  return createEmbed({
    title: story.target.title
      ? `${story.target.title} / ${story.item.title || "No title"}`
      : story.item.full_name,
    url:
      story.item.class === "Link"
        ? story.item.source.url
        : story.item.class === "Attachment"
        ? story.item.attachment.url
        : `${arenaBase.url}block/${story.item.id}/`,
    author: {
      name: story.user.full_name && story.user.full_name,
      iconURL: story.user.avatar_image.display
        ? story.user.avatar_image.display
        : arenaBase.icon,
      url: `${arenaBase.url}${story.user.slug}`,
    },
    description:
      story.item.class === "Text"
        ? story.item.content
        : story.item.description || undefined,
    image: story.item.image && story.item.image.original.url,
    timestamp: new Date(story.created_at),
    footer: {
      text: "Connected",
    },
  });
}
