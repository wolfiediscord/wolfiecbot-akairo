const { Listener } = require('discord-akairo');
const embed = require('embed');
class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message, command, remaining) {
       let secs = remaining / 1000;
       let errmsg = embed.error(`You cannot use this command for ${secs} more second(s).`);
       return message.channel.send({embed: errmsg});
    }
}

module.exports = CooldownListener;