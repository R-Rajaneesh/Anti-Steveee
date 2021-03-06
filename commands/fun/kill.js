const config = require('../../config.json');
const deaths = require('./deaths.json');
const { MessageEmbed } = require('discord.js')
const { parseMember } = require('./utils')

module.exports = {
	name: 'kill',
	description: 'Kills a user',
	aliases: [ 'death', 'die' ],
	usage: `[user] [item]`,
	execute: async(message, args) => {
		const embed = new MessageEmbed().setColor(config.color);
		if (!args[0]) {
			embed.setTitle(
				deaths['1user'][Math.round(Math.random() * deaths['1user'].length)].replace(
					'{user1}',
					message.author.username
				)
			);
		} else {
			const target = parseMember(args[0], message.guild)
			if (!target.success) return message.channel.send(`Could not find user ${args[0]}`)
			if (args[0] && !args[1]) {
				embed.setTitle(
					deaths['2users'][Math.round(Math.random() * deaths['2users'].length)]
						.replace('{user1}', target.member.user.username)
						.replace('{user2}', message.author.username)
				);
			} else {
				args.shift();
				const item = args.join(' ');
				embed.setTitle(
					deaths['1item'][Math.round(Math.random() * deaths['1item'].length)]
						.replace('{user1}', target.member.user.username)
						.replace('{user2}', message.author.username)
						.replace('{item1}', item)
				);
			}
		}
		return message.channel.send(embed);
	}
};