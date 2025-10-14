import { Client, EmbedBuilder, Events, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("Some title")
  .setURL("https://are.na/")
  .setAuthor({
    name: "Some name",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
    url: "https://are.na",
  })
  .setDescription("Some description here")
  .setThumbnail("https://i.imgur.com/AfFp7pu.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true }
  )
  .addFields({
    name: "Inline field title",
    value: "Some value here",
    inline: true,
  })
  .setImage("https://i.imgur.com/AfFp7pu.png")
  .setTimestamp()
  .setFooter({
    text: "Some footer text here",
    iconURL: "https://i.imgur.com/AfFp7pu.png",
  });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    channel.send({ embeds: [exampleEmbed] });
  } else {
    console.log("Channel not found");
  }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
