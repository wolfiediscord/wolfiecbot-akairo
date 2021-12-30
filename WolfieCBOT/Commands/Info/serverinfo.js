const { Command } = require('discord-akairo');
const dateFormat = require('dateformat');
class ServerInfoCommand extends Command {
  constructor() {
    super('serverinfo', {
      aliases: ['serverinfo'],
      description: {
        content: 'Gets information about the server.',
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     /*
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['MANAGE_MESSAGES'],
     */
     /*
     // optional args. See docs for more details about args
      args: [
        {
          id: 'variablename',
          type: 'string',
          prompt: {
            start: 'What would you like?'
          },
          match: 'content'
        }
      ]
     */
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
       let channelcount = message.guild.channels.cache.keyArray();
  let rolecount = message.guild.roles.cache.keyArray();
  let textchannelcount = 0;
  let voicechannelcount = 0;
  let categorycount = 0;
  channelcount.forEach(channel => {
    let channelfetch = message.guild.channels.cache.get(channel);
    if(channelfetch.type === 'text') return textchannelcount++;
    if(channelfetch.type === 'voice') return voicechannelcount++;
    if(channelfetch.type === 'category') return categorycount++;
  });
  let humans = message.guild.members.cache.filter(m => !m.user.bot);
  let bots = message.guild.members.cache.filter(m => m.user.bot);
  let owner = await message.guild.members.fetch(message.guild.ownerID);
    let serverin = {
    title: `Server Info for ${message.guild.name}`,
    thumbnail: {url: message.guild.iconURL()},
    color: `#${process.env.COLOR}`,
    description: `ID: \`${message.guild.id}\`\nCreation Date: \`${dateFormat(message.guild.createdTimestamp, 'longDate')}\`\nOwner: ${(owner) ? `\`${owner.user.tag}\`` : '<:wolfx:695361329803821086> Owner not found or cached.'}\nRegion: \`${message.guild.region}\`\nCatagories: \`${categorycount}\`\nText Channels: \`${textchannelcount}\`\nVoice Channels: \`${voicechannelcount}\`\nMembers: \`${message.guild.memberCount}\`\nHumans: \`${humans.size}\`\nBots: \`${bots.size}\`\nRoles: \`${rolecount.length - 1}\`\nLarge? (250+ Members): ${(message.guild.large ? '<:wolfcheckmark:695361282219442286>' : '<:wolfx:695361329803821086>')}`
  }
    return message.channel.send({embed: serverin})
  }
}

module.exports = ServerInfoCommand;