const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class WarnCommand extends Command {
  constructor() {
    super('warn', {
      aliases: ['warn'],
      description: {
        usage: ['<user>'],
        content: 'Warns a user in the server.\n\n**Available Flags**\n`--nodm` - Disables the DM Message when they get warned.\n`--r:` - Set the reason of the warn. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['@Wolfie#7968', '@Wolfie#7968 --nodm', '@Wolfie#7968 --r: "Being mean!"', '@Wolfie#7968 --nodm --r: "Being mean!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to warn?',
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
	  await message.channel.send({embed: embed.error("This command is no longer available. Please see the bot's website for the reason.")});
	  /*
    if(args.member.user === message.author) return message.channel.send({embed: embed.error('You cannot warn yourself!')});
    if(args.member.user.bot) return message.channel.send({embed: embed.error('You cannot warn bot users!')});
    await message.channel.send({embed: embed.warn(`Are you sure you want to warn ${args.member.user}?\nThis command will be cancelled in 10 seconds.`)})
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
      let warnEmbed = {
              author: {
                name: `Member Warned`,
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
              color: "#fff700",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
              thumbnail: {
                url: args.member.user.displayAvatarURL()
              }
            };
      if(args.nodm) {
        try {
        await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
        message.guild.id,
        args.member.user.id,
        message.author.id,
        args.reason,
        'Warn',
        Date.now()
      ]);
        await this.client.emit('guild_modlog', message.guild, warnEmbed);
        return message.channel.send({embed: embed.success(`Successfully warned ${args.member.user} for: \`${args.reason}\`!`)});
        } catch {
        return message.channel.send({embed: embed.error('An unknown error occured when warning that user.')});
        }
      } else {
        let msgToSend = {
                author: {
                  name: `You were warned in ${message.guild.name}`,
                  icon_url: message.guild.iconURL()
                },
                color: '#fff700',
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
                  text: `Warn | ${dateFormat()}`
                }
              };
        let successDM = true;
        try {
        args.user.send({embed: msgToSend});
        } catch {
        successDM = false;  
        };
        
        try {
        await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
        message.guild.id,
        args.member.user.id,
        message.author.id,
        args.reason,
        'Warn',
        Date.now()
      ]);
        await this.client.emit('guild_modlog', message.guild, warnEmbed);
        return message.channel.send({embed: (successDM) ? embed.success(`Successfully warned ${args.member.user} for: \`${args.reason}\`!`) : embed.warn(`Successfully warned ${args.member.user} for: \`${args.reason}\`, but they had their DMs off.`)})
        } catch {
        return message.channel.send({embed: embed.error('An unknown error occured when warning that user.')});
        }
      }
      } else if(reaction.emoji.name === '❌') return sentMsg.edit({embed: embed.info('Cancelled command.')})
    }).catch(err => sentMsg.edit({embed: embed.error('You didn\'t react in time! Cancelled command.')})) });
    return;
  } */
  }}

module.exports = WarnCommand;
