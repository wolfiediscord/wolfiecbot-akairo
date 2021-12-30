const { Listener } = require('discord-akairo');
const embed = require('embed');
class MissingPermsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    exec(message, command, type, missing) {
    if(type === 'client') {
    if(!message.channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return;
    if(!message.channel.permissionsFor(message.guild.me).toArray().includes('EMBED_LINKS')) return message.channel.send('I cannot send embeds in this channel, which this bot heavily relies on. Please enable the permission`EMBED_LINKS` for me!')
    let errmsg = embed.error(`I couldn't run \`${command.aliases[0]}\` because I don't have permission!`);
    errmsg.fields = [
      {
        name: 'Missing Permissions',
        value: `\`${missing}\``
      }
    ]
    return message.channel.send({embed: errmsg});
    } else if(type === 'user') {
    if(!message.channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return;
    if(!message.channel.permissionsFor(message.guild.me).toArray().includes('EMBED_LINKS')) return message.channel.send('I cannot send embeds in this channel, which this bot heavily relies on. Please enable the permission`EMBED_LINKS` for me!')
    let errmsg = embed.error(`You are not allowed to run \`${command.aliases[0]}\` because you do not have permission.`);
    errmsg.fields = [
      {
        name: 'Missing Permissions',
        value: `\`${missing}\``
      }
    ];
    return message.channel.send({embed: errmsg});
    }
      
    }
}

module.exports = MissingPermsListener;