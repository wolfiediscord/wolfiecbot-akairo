const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class PardonCommand extends Command {
  constructor() {
    super('pardon', {
      aliases: ['pardon', 'clearwarns'],
      description: {
        usage: ['<user>'],
        content: 'Clears a user of **all** of their warns.\n\n**Available Flags**\n`--r:` - Sets the reason of the pardon. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['@Wolfie#7968', '@Wolfie#7968 --r: "Being nice!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_GUILD'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to pardon?',
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
    let userWarns = await this.client.db.all(`SELECT * FROM warns WHERE guildid = ${message.guild.id} AND userid = "${args.member.user.id}" AND type = "Warn"`);
    if(userWarns.length === 0) return message.channel.send({embed: embed.error('That user doesn\'t have any warnings!')});
      let pardonEmbed = {
              author: {
                name: `Member Pardoned`,
                icon_url: message.author.displayAvatarURL()
              },
              fields: [
                {
                  name: `Moderator`,
                  value: `${message.author.tag} (${message.author.id})`
                },
                {
                  name: `Member Pardoned`,
                  value: `${args.member.user.tag} (${args.member.user.id})`
                },
                {
                  name: `Reason`,
                  value: `${args.reason}`
                }
              ],
              color: "GREEN",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
              thumbnail: {
                url: args.member.user.displayAvatarURL()
              }
            };
    try {
    await this.client.db.run(`DELETE FROM warns WHERE guildid = "${message.guild.id}" AND userid = "${args.member.user.id}" AND type = "Warn"`);
    await this.client.emit('guild_modlog', message.guild, pardonEmbed);
    return message.channel.send({embed: embed.success(`Successfully pardoned ${args.member.user} of all of their warnings!`)});
    } catch {
    return message.channel.send({embed: embed.error('An unknown error occured when pardoning that user.')});
    }
  }
  }}

module.exports = PardonCommand;
