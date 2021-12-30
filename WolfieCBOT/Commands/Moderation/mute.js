const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class MuteCommand extends Command {
  constructor() {
    super('mute', {
      aliases: ['mute', 'silence'],
      description: {
        usage: ['<user>'],
        content: 'Gives the specified user the role setup by the server owner.\n\n**Available Flags**\n`--nodm` - Disables the DM Message when they get muted.\n`--r:` - Set the reason of the mute. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['@Wolfie#7968', '@Wolfie#7968 --nodm', '@Wolfie#7968 --r: "Very Mean!"', '@Wolfie#7968 --nodm --r: "Very Mean!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_ROLES'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to mute?',
            retry: 'Invalid user. Try again.'
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
    let mutedrole = await message.guild.roles.cache.get(await this.client.settings.get(message.guild.id, 'mutedrole'));
    if(!mutedrole) return message.channel.send({embed: embed.error('There isn\'t a muted role set! Set one using `settings`.')});
    if(args.member === message.member) return message.channel.send({embed: embed.error('You cannot mute yourself!')});
    if(!args.member.manageable) return message.channel.send({embed: embed.error('I cannot mute that user.')});
    if(args.member.roles.cache.has(mutedrole.id)) return message.channel.send({embed: embed.error('That user is already muted!')});
    await message.channel.send({embed: embed.warn(`Are you sure you want to mute ${args.member.user}?\nThis command will be cancelled in 10 seconds.`)})
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
      let mutedEmbed = {
              author: {
                name: `Member Muted`,
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
              color: "#ff3700",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
              thumbnail: {
                url: args.member.user.displayAvatarURL()
              }
        };
        
        if(args.nodm || args.member.user.bot) {
        try {
        await args.member.roles.add(mutedrole, `[Mute] ${message.author.tag} - ${args.reason}`);
        await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
        message.guild.id,
        args.member.user.id,
        message.author.id,
        args.reason,
        'Mute',
        Date.now()
      ]);
        await this.client.emit('guild_modlog', message.guild, mutedEmbed);
        return sentMsg.edit({embed: embed.success(`Successfully muted ${args.member.user} for: \`${args.reason}\`!`)});
        } catch {
        return sentMsg.edit({embed: embed.error('An unknown error occured when muting them.')})
        }
        } else {
                let msgToSend = {
                author: {
                  name: `You were muted in ${message.guild.name}`,
                  icon_url: message.guild.iconURL()
                },
                color: '#ff3700',
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
                  text: `Mute | ${dateFormat()}`
                }
        }
        let successDM = true;
        try {
        args.member.send({embed: msgToSend})
        } catch {
        successDM = false;
        };
        
        try {
        await args.member.roles.add(mutedrole, `[Mute] ${message.author.tag} - ${args.reason}`);
        await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
        message.guild.id,
        args.member.user.id,
        message.author.id,
        args.reason,
        'Mute',
        Date.now()
      ]);
        await this.client.emit('guild_modlog', message.guild, mutedEmbed);
        return sentMsg.edit({embed: (successDM) ? embed.success(`Successfully muted ${args.member.user} for \`${args.reason}\`!`) : embed.warn(`Successfully muted ${args.member.user} for \`${args.reason}\`, but they had their DMs off.`)});
        } catch {
        return sentMsg.edit({embed: embed.error('An unknown error occured when muting them.')})
        }
        }
      } else if(reaction.emoji.name === '❌') {
        sentMsg.edit({embed: embed.info('Cancelled command.')})
      }
    }).catch(err => sentMsg.edit({embed: embed.error('You didn\'t react in time! Cancelled command.')})); 
  });
    return;
  } 
  }}

module.exports = MuteCommand;
