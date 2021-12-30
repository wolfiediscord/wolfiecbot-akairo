const { Listener } = require('discord-akairo');
const embed = require('embed');
class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    exec(message, command, reason) {
    let errmsg = embed.error(`You are blocked from using \`${command.aliases[0]}\``);
    let block_reason;
    if(reason === 'owner') {
      block_reason = 'You are not the bot owner.'
    } else if(reason === 'dm') {
      block_reason = 'You cannot run this command in guilds.'
    } else {
      block_reason = 'You cannot run this command in DMs.'
    };
    errmsg.fields = [
      {
        name: 'Reason',
        value: block_reason
      }
    ];
     return message.channel.send({embed: errmsg});
    }
}

module.exports = CommandBlockedListener;