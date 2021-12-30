const { Command } = require('discord-akairo');
const dateFormat = require('dateformat');
const embedMaker = require('embed');
const { stripIndents } = require('common-tags');
class WhoIsCommand extends Command {
  constructor() {
    super('whois', {
      aliases: ['whois'],
      description: {
        usage: ['(user)'],
        content: 'Gets information about a user.',
        examples: ['@Wolfie#7968']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
    // userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'user',
          type: 'user',
          default: message => message.author,
          match: 'content'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    if(args.user === null || !args.user) return message.channel.send({embed: embedMaker.error('That isn\'t a valid user!')});
    let member = message.guild.member(args.user);
    if(!member) return message.channel.send({embed: embedMaker.error('That isn\'t a valid user!')});
    let badges = await args.user.fetchFlags().then(f => f.toArray());
    let badgesEmoji = badges.map(f => {
      switch(f) {
        case 'DISCORD_EMPLOYEE':
        return '<:staff:717424194970976279>'
        break;
        case 'DISCORD_PARTNER':
        return '<:partner:717424195260121128>'
        break;
        case 'HYPESQUAD_EVENTS':
        return '<:hypesquad:717424195255926947>'
        break;
        case 'BUGHUNTER_LEVEL_1':
        return '<:bughunter:717424195168108555>LV1';
        break;
        case 'HOUSE_BRAVERY':
        return '<:bravery:717424195117645964>';
        break;
        case 'HOUSE_BRILLIANCE':
        return '<:brilliance:717424195172171846>';
        break;
        case 'HOUSE_BALANCE':
        return '<:balance:717424195113320469>';
        break;
        case 'EARLY_SUPPORTER':
        return '<:earlysupporter:717424195075571773>';
        break;
        case 'BUGHUNTER_LEVEL_2':
        return '<:bughunter:717424195168108555>LV2';
        break;
        case 'VERIFIED_DEVELOPER':
        return '<:developer:717427591887323148>';
        break;
        case 'VERIFIED_BOT':
        return '<:verified:719340110901936219>';
        break;
      }
    });
    let em = {
      color: `#${process.env.COLOR}`,
      title: `About ${args.user.tag} ${(args.user.bot) ? '[BOT]' : ''}`,
      description: stripIndents`User ID: \`${args.user.id}\`
      Joined Server At: \`${dateFormat(member.joinedTimestamp)} UTC\`
      Joined Discord at: \`${dateFormat(args.user.createdTimestamp)} UTC\`
      Discord Badges [${badges.length}]: ${(badges.length !== 0) ? badgesEmoji.join(' ') : '<:wolfx:695361329803821086>'}
      Nickname: ${(args.user.username === member.displayName) ? '<:wolfx:695361329803821086>' : `\`${member.displayName}\``}
      Roles [${member.roles.cache.size - 1}]: ${(member.roles.cache.size !== 1) ? member.roles.cache.filter(r => r !== message.guild.roles.everyone).map(r => `${r}`).join(' ') : '<:wolfx:695361329803821086>'}
      Permissions: ${(member.permissions.toArray().length !== 0) ? `\`\`\`${member.permissions.toArray().join(', ')}\`\`\`` : '<:wolfx:695361329803821086>'}`
      ,thumbnail: {url: `${args.user.displayAvatarURL({format: 'png', dynamic: true})}`},
      url: `${args.user.displayAvatarURL({format: 'png', dynamic: true})}`
    }
    return message.channel.send({ embed: em });
  }
}

module.exports = WhoIsCommand;