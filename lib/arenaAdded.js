import { createEmbed } from "./embed.js";

export default function added(story) {
  console.log("Added block", story);

  return createEmbed({});
}
