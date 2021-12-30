const { Command } = require("discord-akairo");
const embed = require("embed");
const dateFormat = require("dateformat");
class KickCommand extends Command {
  constructor() {
    super("kick", {
      aliases: ["kick"],
      description: {
        usage: ["<user>"],
        content: "Kicks a user from the server.\n\n**Available Flags**\n`--nodm` - Disables the DM Message when they get kicked.\n`--r:` - Set the reason of the kick. Make sure to surround it in double quotes if you have spaces in the reason.",
        examples: [
          "@Wolfie#7968",
          "@Wolfie#7968 --nodm",
          '@Wolfie#7968 --r: "Very Mean!"',
          '@Wolfie#7968 --nodm --r: "Very Mean!"'
        ]
      },
      category: "Moderation",
      // uncomment if you want a different cooldown than 3 seconds
      // cooldown: 5000,
      // ownerOnly: true,
      // uncomment if you want it to be guild only
      channel: "guild",

      // permissions
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: [
        "SEND_MESSAGES",
        "EMBED_LINKS",
        "ADD_REACTIONS",
        "KICK_MEMBERS"
      ],

      // optional args. See docs for more details about args
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: "Who do you want to kick?",
            retry: "Invalid user. Try again."
          },
          match: "text"
        },
        {
          id: "nodm",
          match: "flag",
          flag: "--nodm"
        },
        {
          id: "reason",
          match: "option",
          flag: "--r:",
          default: "No reason provided."
        }
      ]
    });
  }
  async exec(message, args) {
    // code here & make sure to always return, so akairo knows it's done
    if (message.member === args.member)
      return message.channel.send({
        embed: embed.error("You cannot kick yourself!")
      });
    if (!args.member.kickable)
      return message.channel.send({
        embed: embed.error("I cannot kick that user.")
      });

    await message.channel
      .send({
        embed: embed.warn(
          `Are you sure you want to kick ${args.member.user}?\nThis command will be cancelled in 10 seconds.`
        )
      })
      .then(async sentMsg => {
        await sentMsg.react("✅");
        await sentMsg.react("❌");
        let filter = (reaction, user) => {
          return (
            ["✅", "❌"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };
        sentMsg
          .awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] })
          .then(async collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === "✅") {
              let kickEmbed = {
              author: {
                name: `Member Kicked`,
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
              color: "#ff8000",
              footer: {
                text: `${dateFormat(Date.now())}`
              },
              thumbnail: {
                url: args.member.user.displayAvatarURL()
              }
            };
              if(args.nodm || args.member.user.bot) {
              try {
              await args.member.kick(`${message.author.tag} - ${args.reason}`)
              await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
              message.guild.id,
              args.member.user.id,
              message.author.id,
              args.reason,
              'Kick',
              Date.now()
              ]); 
              await this.client.emit('guild_modlog', message.guild, kickEmbed);
              return sentMsg.edit({embed: embed.success(`Successfully kicked ${args.member.user} for: \`${args.reason}\`!`)})
              } catch (err) {
              return sentMsg.edit({embed: embed.error('An unknown error occured when kicking them.')})
              }
              } else {
              let msgToSend = {
                author: {
                  name: `You were kicked from ${message.guild.name}`,
                  icon_url: message.guild.iconURL()
                },
                color: '#ff8000',
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
                  text: `Kick | ${dateFormat()}`
                }
              };
              let successfulDM = true;
              try {
              await args.member.send({embed: msgToSend});
              } catch {
              successfulDM = false;
              };
              
              try {
              await args.member.kick(`${message.author.tag} - ${args.reason}`)
              await this.client.db.run('INSERT INTO warns VALUES (?, ?, ?, ?, ?, ?)', [
              message.guild.id,
              args.member.user.id,
              message.author.id,
              args.reason,
              'Kick',
              Date.now()
              ]);
              await this.client.emit('guild_modlog', message.guild, kickEmbed);
              return sentMsg.edit({embed: (successfulDM) ? embed.success(`Successfully kicked ${args.member.user} for: \`${args.reason}\`!`) : embed.warn(`Successfully kicked ${args.member.user} for \`${args.reason}\`, but they had their DMs off.`)})
              } catch {
              sentMsg.edit({embed: embed.error('An unknown error occured when kicking them.')})
              }  
                
              }
            } else if (reaction.emoji.name === "❌")
              return sentMsg.edit({ embed: embed.info("Cancelled command.") });
          })
          .catch(err =>
            sentMsg.edit({
              embed: embed.error("You didn't react in time! Cancelled command.")
            })
          );
      });
  } 
  } }

module.exports = KickCommand;
