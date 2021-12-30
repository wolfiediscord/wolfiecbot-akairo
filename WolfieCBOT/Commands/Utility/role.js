const { Command } = require('discord-akairo');
const embed = require('embed');
class RoleCommand extends Command {
  constructor() {
    super('role', {
      aliases: ['role'],
      description: {
        usage: ['<option> <user> <role>'],
        content: 'Add or remove a role from a user.\n**Note**: Surround the username/role in quotes if they have a space in their name.\n\n**Options**\n`add`,`+` - Add a role.\n`remove`,`-` - Remove a role.',
        examples: ['add @Wolfie#7968 Moderator', 'remove @Wolfie#7968 Trial Moderator']
      },
      category: 'Utility',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_ROLES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES'],
     
    
     // optional args. See docs for more details about args
      args: [
        {
          id: 'option',
          type: (message, phrase) => {
          if(!['add', '+', 'remove', '-'].includes(phrase.toLowerCase())) return null;
          return phrase.toLowerCase();
          },
          prompt: {
            start: 'What do you want to do? Options are `add`, `+`, `remove`, and `-`.',
            retry: 'Invalid option. Options are `add`, `+`, `remove`, and `-`.'
          }, 
          match: 'phrase'
        }, {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to invoke this on?',
            retry: 'Invalid user. Try again.'
          },
          match: 'phrase'
        }, {
          id: 'role',
          type: 'role',
          prompt: {
            start: 'What role?',
            retry: 'Invalid role. Try again.'
          },
          match: 'rest'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    if(args.option === '+' || args.option === 'add') {
      if(args.role.position >= message.guild.me.roles.highest.position) return message.channel.send({embed: embed.error('That role is higher than mine!')});
      if(args.role.position >= message.member.roles.highest.position) return message.channel.send({embed: embed.error('That role is higher than yours!')});
      try {
      await args.member.roles.add(args.role, `${message.author.tag} - Added role using role command.`);  
      return message.channel.send({embed: embed.success(`Successfully added ${args.role} to ${args.member}!`)})
      } catch {
      return message.channel.send({embed: embed.error('Couldn\'t add that role for an unknown reason.')});
      }
    } else if(args.option === '-' || args.option === 'remove') {
      if(args.role.position >= message.guild.me.roles.highest.position) return message.channel.send({embed: embed.error('That role is higher than mine!')});
      if(args.role.position >= message.member.roles.highest.position) return message.channel.send({embed: embed.error('That role is higher than yours!')});
      try {
      await args.member.roles.remove(args.role, `${message.author.tag} - Removed role using role command.`);
      return message.channel.send({embed: embed.success(`Successfully removed ${args.role} from ${args.member}!`)})
      } catch {
      return message.channel.send({embed: embed.error('Couldn\'t remove that role for an unknown reason.')});  
      }
    }
  }
}

module.exports = RoleCommand;