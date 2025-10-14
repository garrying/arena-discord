import { EmbedBuilder } from "discord.js";

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
  if (title) embed.setTitle(title);
  if (url) embed.setURL(url);
  if (author) embed.setAuthor(author);
  if (description) embed.setDescription(description);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (fields.length > 0) embed.addFields(...fields);
  if (image) embed.setImage(image);
  if (timestamp) embed.setTimestamp(timestamp);
  if (footer) embed.setFooter(footer);

  return embed;
}
