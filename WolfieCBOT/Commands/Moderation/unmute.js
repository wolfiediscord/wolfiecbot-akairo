const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class UnmuteCommand extends Command {
  constructor() {
    super('unmute', {
      aliases: ['unmute', 'unsilence'],
      description: {
        usage: ['<user>'],
        content: 'Removes the role setup by the owner from a specified user.\n\n**Available Flags**\n`--r:` - Sets the reason of the unmute. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['@Wolfie#7968', '@Wolfie#7968 --r: "Being good!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to unmute?',
            retry: 'Invalid user. Try again.'
          },
          match: 'text'
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
    let mutedrole = await message.guild.roles.cache.get(await this.client.settings.get(message.guild.id, 'mutedrole'));
    if(!mutedrole) return message.channel.send({embed: embed.error('There isn\'t a muted role set! Set one using `settings`.')})
    if(args.member === message.member) return message.channel.send({embed: embed.error('You cannot unmute yourself!')});
    if(!args.member.manageable) return message.channel.send({embed: embed.error('I cannot unmute that user.')});
    if(!args.member.roles.cache.has(mutedrole.id)) return message.channel.send({embed: embed.error('That user is already unmuted!')});
    let unmuteEmbed = {
              author: {
                name: `Member Unmuted`,
                icon_url: message.author.displayAvatarURL()
              },
              fields: [
                {
                  name: `Moderator`,
                  value: `${message.author.tag} (${message.author.id})`
                },
                {
                  name: `Offending Member`,
                  value: `${args.member.user.tag} (${args.member.user.id})`
                },
                {
                  name: `Reason`,
                  value: `${args.reason}`
                }
              ],
              color: "#b7ff00",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
              thumbnail: {
                url: args.member.user.displayAvatarURL()
              }
            };
    try {
    await args.member.roles.remove(mutedrole, `[Unmute] ${message.author.tag} - ${args.reason}`);
    await this.client.emit('guild_modlog', message.guild, unmuteEmbed);
    return message.channel.send({embed: embed.success(`Successfully unmuted ${args.member.user} for: \`${args.reason}\`!`)})
    } catch {
    return message.channel.send({embed: embed.error('An unknown error occured when unmuting them.')});
    }
    return;
  }
}

module.exports = UnmuteCommand;