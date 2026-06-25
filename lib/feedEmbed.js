import colors from "../utils/colors.js";
import { createEmbed } from "../utils/embed.js";
import { largeImage } from "../utils/image.js";
import { renderSubject } from "../utils/subject.js";
import arenaBase from "./arenaConfig.js";

function actorOf(actor) {
  return {
    name: actor.name,
    iconURL: actor.avatar || undefined,
    url: arenaBase.url + actor.slug,
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
    author: actorOf(story.actor),
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
      image: largeImage(block.image),
      description: quoteComment(story.item, block),
    });
  }

  const subject = story[cfg.headline];
  if (!subject) return null;
  const parts = renderSubject(subject);
  if (cfg.color) parts.color = colors[story[cfg.color]?.visibility];
  return createEmbed({ ...parts, ...common });
}

const MAX_LISTED = 10;

export function buildConnectedEmbed(stories) {
  const { actor, target } = stories[0];
  const blocks = stories.map((s) => s.item).filter(Boolean);
  if (!blocks.length) return null;

  const lines = blocks.slice(0, MAX_LISTED).map((block) => {
    const { title, url } = renderSubject(block);
    return `• [${title}](${url})`;
  });
  if (blocks.length > MAX_LISTED) {
    lines.push(`…and ${blocks.length - MAX_LISTED} more`);
  }

  const { title, url, color } = renderSubject(target);
  return createEmbed({
    author: actorOf(actor),
    title,
    url,
    color,
    description: lines.join("\n"),
    image: blocks.map((block) => largeImage(block.image)).find(Boolean),
    footer: { text: `➕ Connected ${blocks.length} blocks` },
    timestamp: new Date(stories[0].created_at),
  });
}
