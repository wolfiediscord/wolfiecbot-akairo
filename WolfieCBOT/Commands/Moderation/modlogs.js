const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const dateFormat = require('dateformat');
const embedMaker = require('embed');
class ModlogsCommand extends Command {
  constructor() {
    super('modlogs', {
      aliases: ['modlogs', 'modlog', 'warns'],
      description: {
        usage: ['(user)'],
        content: 'View the modlogs of a user.\n\n**Available Flags**\n`--clearall` - Clears all modlogs of a user.',
        examples: ['@Wolfie#7968', '@Wolfie#7968 --clearall']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          default: message => message.member,
          match: 'text',
        }, {
          id: 'clearall',
          match: 'flag',
          flag: '--clearall'
        }
      ]
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
  await message.channel.send({embed: embed.error("This command is no longer available. Please see the bot's website for the reason.")});
	/*
  const member = args.member;
  if(args.clearall) {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send({embed: embedMaker.error('You do not have permission to clear modlogs. You must have `MANAGE_GUILD` in order to clear modlogs!')});
    try {
    await this.client.db.run(`DELETE FROM warns WHERE guildid = "${message.guild.id}" AND userid = "${member.id}"`);
    return message.channel.send({embed: embedMaker.success(`Successfully cleared all modlogs for ${args.member}!`)});
    } catch (err) {
    console.error(err);
    return message.channel.send({embed: embedMaker.error('An unknown error occured when deleting their modlogs.')})
    }
  }
  const warns = await this.client.db.all(`SELECT * FROM warns WHERE guildid = "${message.guild.id}" AND userid = "${member.id}"`)
const embed = new MessageEmbed();
embed.setAuthor(`Modlogs | ${member.user.tag}`, member.user.displayAvatarURL());
embed.setColor(`#${process.env.COLOR}`);
if (warns.length > 0) {
  for(let i = 0; i < warns.length; i++) {
    if(i === 25) break;
    let mod = await this.client.users.fetch(warns[i].modid).catch(() => null);
    let warnedAt = dateFormat(warns[i].warndate, 'longDate');
    embed.addField(`${warns[i].type}`, `Moderator: ${mod.tag}\nReason: *${warns[i].reason}*\nDate: ${warnedAt}`);
  }
  return message.channel.send(embed); 
} else {
  embed.setDescription(`${member} has 0 moderator actions!`);
  return message.channel.send(embed);
}
  } */
} }

module.exports = ModlogsCommand;
