const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban'],
      description: {
        usage: ['<user>'],
        content: 'Bans a user from your server.\n\n**Available Flags**\n`--nodm` - Disables the DM Message when they get banned.\n`--r:` - Set the reason of the ban. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['@Wolfie#7968', '@Wolfie#7968 --nodm', '@Wolfie#7968 --r: "Very Mean!"', '@Wolfie#7968 --nodm --r: "Very Mean!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['BAN_MEMBERS'],
     clientPermissions: ['SEND_MESSAGES','EMBED_LINKS','ADD_REACTIONS','BAN_MEMBERS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to ban?',
            retry: 'That isn\'t a valid user. Try again.'
          },
          match: 'text'
        }, {
          id: 'nodm',
          match: 'flag',
          flag: '--nodm'
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
    if(args.member.user === message.author) return message.channel.send({embed: embed.error('You cannot ban yourself!')});
    if(!args.member.bannable) return message.channel.send({embed: embed.error('I cannot ban that user.')});
    await message.channel.send({embed: embed.warn(`Are you sure you want to ban ${args.member.user}?\nThis command will be cancelled in 10 seconds.`)})
    .then(async sentMsg => {
    await sentMsg.react('✅');
    await sentMsg.react('❌');
    let filter = (reaction, user) => {
      return (['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id)
    };
    sentMsg
        .awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] }).then(async collected => {
      const reaction = collected.first();
      if(reaction.emoji.name === '✅') {
     let banEmbed = {
              author: {
                name: `Member Banned`,
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
              color: "#ff0000",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
              thumbnail: {
                url: args.member.user.displayAvatarURL()
              }
            };
      if(args.nodm || args.member.user.bot) {
      try {
      await args.member.ban({reason: `${message.author.tag} - ${args.reason}`});
      await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
        message.guild.id,
        args.member.user.id,
        message.author.id,
        args.reason,
        'Ban',
        Date.now()
      ]);
      await this.client.emit('guild_modlog', message.guild, banEmbed);
      return sentMsg.edit({embed: embed.success(`Successfully banned ${args.member.user} for: \`${args.reason}\`!`)})
      } catch {
      return sentMsg.edit({embed: embed.error('An unknown error occured when banning them.')})
      }
      } else {
       let banMsg = {
                author: {
                  name: `You were banned from ${message.guild.name}`,
                  icon_url: message.guild.iconURL()
                },
                color: '#ff0000',
                fields: [
                  {
                    name: `Moderator`,
                    value: message.author.tag
                  }, {
                    name: `Reason`,
                    value: `${args.reason}`
                  }
                ],
                footer: {
                  text: `Ban | ${dateFormat()}`
                }
              };
      let successfulDM = true;
      try {
      await args.member.user.send({embed: banMsg});
      } catch {
      successfulDM = false
      };
      try {
      await args.member.ban({reason: `${message.author.tag} - ${args.reason}`});
        await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
        message.guild.id,
        args.member.user.id,
        message.author.id,
        args.reason,
        'Ban',
        Date.now()
      ]);
      await this.client.emit('guild_modlog', message.guild, banEmbed);
      let successEmbed = (successfulDM) ? embed.success(`Successfully banned ${args.member.user} for: \`${args.reason}\`!`) : embed.warn(`Successfully banned ${args.member.user} for: \`${args.reason}\`, but they had their DMs off.`);
      return sentMsg.edit({embed: successEmbed});
      } catch {
      return sentMsg.edit({embed: embed.error('An unknown error occured when banning them.')});
      }
      }
      } else if(reaction.emoji.name === '❌') {
      return sentMsg.edit({embed: embed.info('Cancelled command.')});
      }
    })
      .catch(err => {
      return sentMsg.edit({embed: embed.error('You didn\'t react in time! Cancelled command.')})
    })
    })
  } 
} }

module.exports = BanCommand;
