const { Listener } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
class CommandErrorListener extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(error, message, command) {
       let errmsg = embed.error(`An unknown error occured when running \`${command.aliases[0]}\` and it has been reported to the developer.`);
      await console.error(`[SHARD ${this.client.shard.ids[0]}] Error: ${error} Command: ${command.id}`);
      await this.client.shard.broadcastEval(`(async () => {
      const owner = this.users.cache.get(\`${process.env.OWNERID}\`);
      if(!owner) return false;
      const { MessageEmbed } = require('discord.js');
      const errEmbed = new MessageEmbed();
      errEmbed.setTitle('Error from Shard ${this.client.shard.ids[0]}');
      errEmbed.setDescription('A command error occured!');
      errEmbed.addFields([{
name: 'Command', value: '\`${command}\`'
}, {
name: 'Error', value: '\`\`\`${error}\`\`\`'
}]);
      errEmbed.setColor('RED');
      errEmbed.setFooter('Error | ${dateFormat()}')
      try {
      await owner.send(errEmbed);
      return true;
      } catch (err) {
      console.error(err);
      return false;
      }
      })()`).then(res => {
        if(!res.includes(true)) console.error('Could not send DM to owner! See the error above.');
      });
   //    await this.client.emit('error', `Command Error Occurred! Command: ${command.id} Error: ${error.stack}`);
       return message.channel.send({embed: errmsg});
    }
}

module.exports = CommandErrorListener;
