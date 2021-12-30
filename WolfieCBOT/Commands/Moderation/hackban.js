const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class HackBanCommand extends Command {
  constructor() {
    super('hackban', {
      aliases: ['hackban'],
      description: {
        usage: ['<user id>'],
        content: 'Bans a user who isn\'t in the server by their ID.\n\n**Available Flags**\n`--r:` Set the reason of the hackban. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['171365108155416577', '171365108155416577 --r: "Raider Alt"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['BAN_MEMBERS'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'user',
          type: 'string',
          prompt: {
            start: 'Who do you want to hackban? (Put a User ID)',
          },
          match: 'phrase'
        }, {
          id: 'reason',
          match: 'option',
          flag: '--r:',
          default: 'No reason provided.'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    await message.channel.send({embed: embed.error("This command is no longer available. Please see the bot's website for the reason.")});
/*
    if(args.user === message.author.id) return message.channel.send({embed: embed.error('You cannot ban yourself!')});
    if(message.guild.members.cache.keyArray().includes(args.user)) return message.channel.send({embed: embed.error('That user is already in the server. Use `ban` to ban them.')});
    let banEmbed = {
              author: {
                name: `Member Hackbanned`,
                icon_url: message.author.displayAvatarURL()
              },
              fields: [
                {
                  name: `Moderator`,
                  value: `${message.author.tag} (${message.author.id})`
                },
                {
                  name: `Offending Member`,
                  value: `${args.user}`
                },
                {
                  name: `Reason`,
                  value: `${args.reason}`
                }
              ],
              color: "#ff0000",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
            };
    try {
    await message.guild.members.ban(args.user, { reason: message.author.tag + ' - ' + args.reason });
    await this.client.emit('guild_modlog', message.guild, banEmbed);
    return message.channel.send({embed: embed.success('Successfully hackbanned that user!')});
    } catch (err) {
   // console.error(err);
    return message.channel.send({embed: embed.error('That is an invalid user, or another error occured.')})
    }
    return;
  } */
 } }

module.exports = HackBanCommand;
