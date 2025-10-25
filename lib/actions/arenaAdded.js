import colors from "../../utils/colors.js";
import { createEmbed } from "../../utils/embed.js";
import arenaBase from "../arenaConfig.js";

export default function added(story) {
  console.log("Connected block", story);

  return createEmbed({
    title: story.item.title || "No title",
    url:
      story.item.class === "Link"
        ? story.item.source.url
        : story.item.class === "Attachment"
        ? story.item.attachment.url
        : story.item.class === "Channel"
        ? `${arenaBase.url}${story.item.owner_slug}/${story.item.slug}`
        : `${arenaBase.url}block/${story.item.id}/`,
    author: {
      name: story.user.full_name,
      iconURL: story.user.avatar_image?.display || undefined,
      url: arenaBase.url + story.user.slug,
    },
    description:
      story.item.class === "Text"
        ? story.item.content
        : story.item.description || undefined,
    image: story.item.image && story.item.image.original.url,
    color: story.item.status ? colors[story.item.status] : undefined,
    fields: story.item.class === "Channel" && [
      {
        name: "Blocks",
        value: story.item.length.toString(),
        inline: true,
      },
      {
        name: "Followers",
        value: story.item.follower_count.toString(),
        inline: true,
      },
    ],
    timestamp: new Date(story.created_at),
    footer: {
      text: `➕ Connected to ${story.target.title}`,
    },
  });
}
