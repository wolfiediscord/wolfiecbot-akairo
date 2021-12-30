const { Command } = require('discord-akairo');
const embed = require('embed');
const { stripIndents } = require('common-tags');
class RoleStatusCommand extends Command {
  constructor() {
    super('rolestatus', {
      aliases: ['rolestatus'],
      description: {
        usage: ['<role>'],
        content: 'Get the status of members for a specific role!',
        examples: ['Member', 'Bots']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
  //   userPermissions: ['MANAGE_MESSAGES'],
   //  clientPermissions: ['MANAGE_MESSAGES'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: 'What role do you want the status of?',
            retry: 'Invalid role. Try again.'
          },
          match: 'content'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    if(args.role.members.size === 0) return message.channel.send({embed: embed.error('That role doesn\'t have any members!')});
    let status = args.role.members.map(m => {
     switch(m.user.presence.status) {
       case 'online': return {status: 'online', msg: `${m} - <:online:717424326311411823> `}; break; 
       case 'idle': return {status: 'idle', msg: `${m} - <:idle:717424326105759865> `}; break;
       case 'dnd': return {status: 'dnd', msg: `${m} - <:dnd:717424326025936937> `}; break;
       case 'offline': return {status: 'offline', msg: `${m} - <:offline:717424326365937684> `}; break;
  }; 
});
    let online = status.filter(m => m.status === 'online').map(m => m.msg);
    let idle = status.filter(m => m.status === 'idle').map(m => m.msg);
    let dnd = status.filter(m => m.status === 'dnd').map(m => m.msg);
    let offline = status.filter(m => m.status === 'offline').map(m => m.msg);
    let msg = {
      title: `Status of Members in ${args.role.name}`,
      fields: [
        {
          name: 'Short View',
          value: `<:online:717424326311411823> ${online.length} Online\n<:idle:717424326105759865> ${idle.length} Idle\n<:dnd:717424326025936937> ${dnd.length} in Do Not Disturb\n<:offline:717424326365937684> ${offline.length} Offline`
        }
      ],
      color: `#${process.env.COLOR}`
    };
    if(args.role.members.size < 30) msg.fields.push({
      name: 'Members',
      value: stripIndents`${(online.length !== 0) ? online.join('\n') : ''} 
      ${(idle.length !== 0) ? idle.join('\n') : ''}
      ${(dnd.length !== 0) ? dnd.join('\n') : ''}
      ${(offline.length !== 0) ? offline.join('\n') : ''}`
    })
    message.channel.send({embed: msg});
    return;
  }
}

module.exports = RoleStatusCommand;