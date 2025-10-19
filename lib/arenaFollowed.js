import arenaBase from "./arenaCommon.js";
import colors from "./colors.js";
import { createEmbed } from "./embed.js";

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
    title: story.item.title
      ? `${story.item.user.full_name} / ${story.item.title}`
      : `${story.item.full_name}`,
    url:
      story.item.class === "Channel"
        ? `${arenaBase.url}${story.item.user.slug}/${story.item.slug}/`
        : `${arenaBase.url}${story.item.slug}/`,
    author: {
      name: story.user.full_name && story.user.full_name,
      iconURL: story.user.avatar_image.display
        ? story.user.avatar_image.display
        : arenaBase.icon,
      url: `${arenaBase.url}${story.user.slug}`,
    },
    thumbnail:
      story.item.class === "User" && story.item.avatar_image.display !== ""
        ? story.item.avatar_image.display
        : undefined,
    fields: [
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
    ],
    description: story.item.metadata
      ? story.item.metadata.description
      : undefined,
    color: story.item.status ? colors[story.item.status] : undefined,
    timestamp: new Date(story.created_at),
    footer: {
      text: "Followed",
    },
  });

  // return createEmbed({
  //   title: "Some title",
  //   url: "https://are.na/",
  //   author: {
  //     name: "Some name",
  //     iconURL: "https://i.imgur.com/AfFp7pu.png",
  //     url: "https://are.na",
  //   },
  //   description: "Some description here",
  //   thumbnail: "https://i.imgur.com/AfFp7pu.png",
  //   fields: [
  //     { name: "Regular field title", value: "Some value here" },
  //     { name: "\u200B", value: "\u200B" },
  //     { name: "Inline field title", value: "Some value here", inline: true },
  //     { name: "Inline field title", value: "Some value here", inline: true },
  //     { name: "Inline field title", value: "Some value here", inline: true },
  //   ],
  //   image: "https://i.imgur.com/AfFp7pu.png",
  //   footer: {
  //     text: "Some footer text here",
  //     iconURL: "https://i.imgur.com/AfFp7pu.png",
  //   },
  // });
}
