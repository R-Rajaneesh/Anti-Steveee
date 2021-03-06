const config = require("../../config.json");
const { client } = require("../../bot.js");

module.exports = {
  name: "userinfo",
  aliases: ["about", "user", "profile"],
  usage: "<user>",
  description: "Gets info about a particular user.",
  availableTo: "@Members",
  parameters:
    "**User**: *optional* the id or @mention of the user you want info about. Defaults to the author if unspecified.",
    execute: async(message, args) => {
    if (!args[0]) id = message.author.id;
    else if (args[0].startsWith("<@") && args[0].endsWith(">"))
      id = args[0].substring(3, 21);
    else if (args[0].startsWith("<@!") && args[0].endsWith(">"))
      id = args[0].substring(4, 21);
    else if (args[0].length == 18) id = args[0];
    else id = message.author.id;

    if (!client.users.cache.get(id)) id = message.author.id;

    const user = client.users.cache.get(id);
    const member = message.guild.members.cache.get(id);

    const responseEmbed = {
      title: `User Info for ${user.tag}`,
      thumbnail: {
        url: `${user.avatarURL({ format: "png", dynamic: "true" })}`,
      },
      fields: [
        {
          name: "Joined Discord",
          value: user.createdAt.toUTCString(),
        },
        {
          name: "Joined Server",
          value: member.joinedAt.toUTCString(),
        },
        {
          name: "Avatar",
          value: `[Link](${user.avatarURL({
            format: "png",
            dynamic: "true",
          })})`,
        },
        {
          name: "ID",
          value: user.id,
        },
        {
          name: "Nickname",
          value: member.nickname == null ? "None" : member.nickname,
        },
      ],
      color: config.color,
    };

    message.channel.send({ embed: responseEmbed });
  },
};
