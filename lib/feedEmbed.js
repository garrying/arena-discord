import colors from "../utils/colors.js";
import { createEmbed } from "../utils/embed.js";
import { renderSubject } from "../utils/subject.js";
import arenaBase from "./arenaConfig.js";

function actorOf(story) {
  return {
    name: story.actor.name,
    iconURL: story.actor.avatar || undefined,
    url: arenaBase.url + story.actor.slug,
  };
}

function quoteComment(comment, block) {
  const body = comment?.body?.markdown ?? "";
  const quoted = block?.type === "Text" ? block.content?.markdown : undefined;
  return quoted ? `${body}\n\n> ${quoted}` : body;
}

const KIND_CONFIG = {
  followed_user: { headline: "item", footer: "➡️ Followed" },
  followed_channel: { headline: "item", footer: "➡️ Followed" },
  followed_group: { headline: "item", footer: "➡️ Followed" },
  created_channel: { headline: "item", footer: "✨ Created channel" },
  added_block_to_channel: {
    headline: "item",
    color: "target",
    footer: (s) => `➕ Connected to ${s.target.title}`,
  },
  added_channel_to_channel: {
    headline: "item",
    footer: (s) => `➕ Connected to ${s.target.title}`,
  },
  collaborating_with_user_on_channel: {
    headline: "target",
    footer: (s) => `🤝 Collaborating with ${s.item.name}`,
  },
  collaborating_with_group_on_channel: {
    headline: "target",
    footer: (s) => `🤝 Collaborating with ${s.item.name}`,
  },
  added_user_to_group: {
    headline: "target",
    footer: (s) => `👥 Added ${s.item.name}`,
  },
  commented_on_block: { block: "target", footer: "💬 Commented" },
  mentioned_you: { block: "parent", footer: "🔔 Mentioned you" },
};

function footerText(cfg, story) {
  return typeof cfg.footer === "function" ? cfg.footer(story) : cfg.footer;
}

export default function buildEmbed(story) {
  const cfg = KIND_CONFIG[story.kind];
  if (!cfg) return null;

  const common = {
    author: actorOf(story),
    footer: { text: footerText(cfg, story) },
    timestamp: new Date(story.created_at),
  };

  if (cfg.block) {
    const block = story[cfg.block];
    if (!block) return null;
    const channel = story.parent?.type === "Channel" ? story.parent : null;
    const title = block.title || "No title";
    return createEmbed({
      ...common,
      title: channel ? `${channel.title} / ${title}` : title,
      url: `${arenaBase.url}block/${block.id}`,
      thumbnail: block.image?.small?.src,
      description: quoteComment(story.item, block),
    });
  }

  const subject = story[cfg.headline];
  if (!subject) return null;
  const parts = renderSubject(subject);
  if (cfg.color) parts.color = colors[story[cfg.color]?.visibility];
  return createEmbed({ ...parts, ...common });
}
