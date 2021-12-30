const { Command } = require('discord-akairo');
const embed = require('embed');
let exec = require("child_process").exec;
class RestartCommand extends Command {
  constructor() {
    super('restart', {
      aliases: ['restart', 'reboot'],
      description: {
        content: 'Restarts the bot.',
      },
      category: 'Owner',
      ownerOnly: true,
      clientPermissions: ['SEND_MESSAGES']
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let infomsg = embed.info('Restarting bot!');
    if(message.channel.type === 'dm') {
    await message.channel.send({embed: infomsg});
    return process.exit(0); 
    } else if(!message.channel.permissionsFor(message.guild.me).toArray().includes('EMBED_LINKS')) {
      await message.channel.send('Restarting bot!');
      return process.exit(0);
    } else {
    await message.channel.send({embed: infomsg});
    return process.exit(0);
    }
  }
}

module.exports = RestartCommand;
