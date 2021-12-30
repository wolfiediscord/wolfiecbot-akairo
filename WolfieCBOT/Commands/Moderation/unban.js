const { Command } = require('discord-akairo');
const dateFormat = require('dateformat');
const embed = require('embed');
class UnbanCommand extends Command {
  constructor() {
    super('unban', {
      aliases: ['unban'],
      description: {
        usage: ['<user>'],
        content: 'Unbans a user from the server by their ID.\n\n**Available Flags**\n`--r:` - Sets the reason of the unban. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['171365108155416577', '171365108155416577 --r: "Being nice!"']
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
          id: 'userid',
          type: 'string',
          prompt: {
            start: 'Who do you want to unban? Use a User ID.'
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
    try {
    await message.guild.members.unban(args.userid).then(async unbannedUser => {
      let unbanEmbed = {
              author: {
                name: `Member Unbanned`,
                icon_url: message.author.displayAvatarURL()
              },
              thumbnail: {
                url: `${unbannedUser.displayAvatarURL()}`
              },
              fields: [
                {
                  name: `Moderator`,
                  value: `${message.author.tag} (${message.author.id})`
                },
                {
                  name: `Member Unbanned`,
                  value: `${unbannedUser.tag} (${unbannedUser.id})`
                },
                {
                  name: `Reason`,
                  value: `${args.reason}`
                }
              ],
              color: "#44ff00",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
            };
      await this.client.emit('guild_modlog', message.guild, unbanEmbed);
      return message.channel.send({embed: embed.success(`Successfully unbanned ${unbannedUser}!`)});
    });
    } catch {
    return message.channel.send({embed: embed.error('An unknown error occured when unbanning them.')});
    }
    return;
  }
}

module.exports = UnbanCommand;