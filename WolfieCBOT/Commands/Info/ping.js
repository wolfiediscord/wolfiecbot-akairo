const { Command } = require('discord-akairo');
const { oneLine } = require('common-tags');
class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'Checks the bot\'s connection to discord.'
      },
      category: 'Info',
      cooldown: 5000,
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
    });
  }
  async exec(msg) {
     let ping = {
      description: 'Pinging...',
      color: `#${process.env.COLOR}`
    }
		const pingMsg = await msg.channel.send({embed: ping});
    let embed = {
      title: 'Pong!',
      description: oneLine`
			The message round-trip took ${
				(pingMsg.editedTimestamp || pingMsg.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp)
			}ms.
			${this.client.ws.ping ? `The heartbeat ping is ${Math.round(this.client.ws.ping)}ms.` : ''}
		`,
      color: `#${process.env.COLOR}`
    };
		pingMsg.edit({embed: embed});
    return;
  }
}

module.exports = PingCommand;