import colors from "./colors.js";
import arenaBase from "../lib/arenaConfig.js";

export function renderSubject(subject) {
  if (!subject) return {};

  switch (subject.type) {
    case "User":
    case "Group":
      return {
        title: subject.name,
        url: arenaBase.url + subject.slug,
        thumbnail: subject.avatar || undefined,
      };

    case "Channel":
      return {
        title: `${subject.owner.name} / ${subject.title}`,
        url: `${arenaBase.url}${subject.owner.slug}/${subject.slug}`,
        color: colors[subject.visibility],
        description: subject.description?.markdown || undefined,
      };

    default:
      return {
        title: subject.title || "No title",
        url:
          subject.source?.url ||
          subject.attachment?.url ||
          `${arenaBase.url}block/${subject.id}`,
        image: subject.image?.src || undefined,
        description:
          (subject.type === "Text"
            ? subject.content?.markdown
            : subject.description?.markdown) || undefined,
      };
  }
}
