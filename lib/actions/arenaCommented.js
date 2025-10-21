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
    thumbnail:
      story.target.class === "Image" ? story.target.image.thumb.url : undefined,
    title: story.target.title
      ? `${story.parent.title} / ${story.target.title || "No title"}`
      : undefined,
    url:
      story.target.class === "Block"
        ? `${arenaBase.url}block/${story.target.id}/`
        : `${arenaBase.url}${story.parent.owner_slug}/${story.parent.slug}`,
    description: story.item.body,
    timestamp: new Date(story.created_at),
    footer: {
      text: "💬 Commented",
    },
  });
}
