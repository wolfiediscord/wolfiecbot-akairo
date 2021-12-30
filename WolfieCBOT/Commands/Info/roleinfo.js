const { Command } = require('discord-akairo');
const dateFormat = require('dateformat');
const { stripIndents } = require('common-tags');
class RoleInfoCommand extends Command {
  constructor() {
    super('roleinfo', {
      aliases: ['roleinfo', 'rinfo'],
      description: {
        usage: ['<role>'],
        content: 'Gets information on a role.',
        examples: ['Muted', 'Owner']
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
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'role',
          type: 'role',
          default: message => message.member.roles.highest,
          match: 'content'
        }
      ],
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let members = args.role.members.keyArray();
    let rolecreatedat = dateFormat(args.role.createdAt, 'longDate');
    let perms = args.role.permissions.toArray();
    let em = {
      title: args.role.name,
      color: `${args.role.hexColor}`,
      description: stripIndents`ID: \`${args.role.id}\`
                    Name: \`${args.role.name}\`
                    Created At: \`${rolecreatedat}\`
                    Color: \`${args.role.hexColor}\`
                    Mentionable?: ${(args.role.mentionable) ? '<:wolfcheckmark:695361282219442286>' : '<:wolfx:695361329803821086>'}
                    Raised/Hoisted?: ${(args.role.hoisted) ? '<:wolfcheckmark:695361282219442286>' : '<:wolfx:695361329803821086>'}
                    Members: \`${members.length}\`
                    Position: \`${args.role.position}\`
                    Permissions: ${(perms.length !== 0) ? `\`\`\`${perms.join(', ')}\`\`\`` : '<:wolfx:695361329803821086>'}`
    }
    return message.channel.send({ embed: em })
  }
}

module.exports = RoleInfoCommand;