const { Command } = require('discord-akairo');
const embed = require('embed');
class SlowmodeCommand extends Command {
  constructor() {
    super('slowmode', {
      aliases: ['slowmode', 'sm'],
      description: {
        usage: ['<seconds>'],
        content: 'Set the slowmode of a channel.\n\n**Note:** Discord rounds the number you input, so 54 seconds might be put as 60 seconds.\n\n**Available Flags**\n`--c:` - Sets the slowmode of a specific channel. If said channel doesn\'t exist, it defaults to the current channel.',
        examples: ['5', '20 --c: #general']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_CHANNELS'],
     clientPermissions: ['MANAGE_CHANNELS', 'EMBED_LINKS', 'SEND_MESSAGES'],
     
     
     // optional args. See docs for more details about args
     args: [{
	   id: 'slowmodeTime',
	   type: (message, phrase) => {
		if(!phrase || isNaN(phrase)) return null;
		const num = parseInt(phrase);
		if(num < 0 || num > 21600) return null;
		return num;
	   },
	   prompt: {
	      start: 'How many seconds do you want to set the slowmode to? The number must be from 0-21600',
	      retry: 'That isn\'t a valid number. Try again.'
	   },
	   match: 'rest'
	}, {
	    id: 'channel',
 	    type: 'channel',
	    match: 'option',
	    flag: '--c:'
	}]
     
    });
  }
  async exec(message, args) {
 	let channel = message.channel;
	// if there is a args.channel we check for perms
	if(args.channel) {
	if(args.channel.type !== 'text' && args.channel.type !== 'news') return message.channel.send({embed: embed.error('That is not a valid channel!')});
	if(!args.channel.permissionsFor(message.member).toArray().includes('MANAGE_CHANNELS')) return message.channel.send({embed: embed.error('You do not have permission to modify that channel!')});
	if(!args.channel.permissionsFor(message.guild.me).toArray().includes('VIEW_CHANNEL') && !args.channel.permissionsFor(message.guild.me).toArray().includes('MANAGE_CHANNELS')) return message.channel.send({embed: embed.error('I do not have permission to modify that channel!')});

	channel = args.channel;
	}
	try {
	await channel.setRateLimitPerUser(args.slowmodeTime, `${message.author.tag} - Set slowmode`);
	message.channel.send({embed: embed.success(`Successfully set slowmode to ${args.slowmodeTime} second(s) for ${channel}!`)});
	} catch (err) {
	message.channel.send({embed: embed.error(`An error occured when setting the slowmode. Please report this error to the developer.\n\n\`\`\`${err}\`\`\``)});
	}
	return;
  }
}

module.exports = SlowmodeCommand;
