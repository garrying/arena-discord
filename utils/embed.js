import { EmbedBuilder } from "discord.js";

function truncate(str, max) {
  if (typeof str !== "string" || str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

export function createEmbed(options = {}) {
  const {
    color,
    title,
    url,
    author,
    description,
    thumbnail,
    fields = [],
    image,
    timestamp = true,
    footer,
  } = options;

  const embed = new EmbedBuilder();

  if (color) embed.setColor(color);
  if (title) embed.setTitle(truncate(title, 256));
  if (url) embed.setURL(url);
  if (author) embed.setAuthor({ ...author, name: truncate(author.name, 256) });
  if (description) embed.setDescription(truncate(description, 4096));
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (fields.length > 0) embed.addFields(...fields);
  if (image) embed.setImage(image);
  if (timestamp) embed.setTimestamp(timestamp);
  if (footer) embed.setFooter({ ...footer, text: truncate(footer.text, 2048) });

  return embed;
}
