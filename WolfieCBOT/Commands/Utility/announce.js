const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class AnnounceCommand extends Command {
  constructor() {
    super('announce', {
      aliases: ['announce', 'broadcast'],
      description: {
        usage: ['<message>'],
        content: 'Sends an announcement in a channel.\n\n**Available Flags**\n`--c` - Sends the announcement message in the current channel.\n`--e` - Mentions everyone.\n`--np` - Disables the ping.\n`--no-cp` - Disables cross posting the announcement.',
        examples: ['Hello there!', '--c Hello there!', '--e Hello there!', '--np Hello there!']
      },
      category: 'Utility',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 30000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES', 'MENTION_EVERYONE'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES', 'MENTION_EVERYONE'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'msg',
          type: 'string',
          prompt: {
            start: 'What do you want to announce?'
          },
          match: 'text'
        }, {
          id: 'channel',
          match: 'flag',
          flag: '--c',
        }, {
          id: 'everyone',
          match: 'flag',
          flag: '--e'
        }, {
          id: 'noping',
          match: 'flag',
          flag: '--np'
        },
	{
	 id: 'nocrosspost',
	 match: 'flag',
	 flag: '--no-cp'
	}
      ]
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
   let announcement = {
     title: ':information_source: Announcement',
     description: args.msg,
     color: 'BLUE',
     description: `${args.msg}`,
     footer: {
       text: `${message.author.tag} | ${dateFormat()}`,
       icon_url: `${message.author.displayAvatarURL()}`
     }
   };
  let channel = await message.guild.channels.cache.get(await this.client.settings.get(message.guild.id, 'announcechannel'));
  if(!channel || args.channel) channel = message.channel;
  let role = await message.guild.roles.cache.get(await this.client.settings.get(message.guild.id, 'announcerole'));
  if(!role || args.everyone) role = '@everyone';  
  if(!channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return message.channel.send({embed: embed.error('I do not have permission to send messages in the announcement channel!')})
  if(!channel.permissionsFor(message.guild.me).toArray().includes('EMBED_LINKS')) return message.channel.send({embed: embed.error('I do not have permission to send embeds in the announcement channel!')});
  if(channel === message.channel) {
   await message.delete().catch();
   message.channel.send(`${(args.noping) ? ' ' : `${role}`}`, {embed: announcement}).then(async sentMsg => {
    if(!args.nocrosspost && channel.type === 'news') await sentMsg.crosspost();
    return;
   });
  } else {
    await channel.send(`${(args.noping) ? ' ' : `${role}`}`, {embed: announcement}).then(async sentMsg => {
    if(!args.nocrosspost && channel.type === 'news') await sentMsg.crosspost();
    });
    await message.channel.send({embed: embed.success('Successfully announced your message!')});
  };
    
  }
}

module.exports = AnnounceCommand;
