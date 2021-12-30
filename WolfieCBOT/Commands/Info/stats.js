const { Command } = require('discord-akairo');
const path = require('path');
class StatisticsCommand extends Command {
  constructor() {
    super('statistics', {
      aliases: ['statistics', 'stats', 'status', 'bot-status', 'botstatus'],
      description: {
        content: 'Gets statistics of the bot.',
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     
     // permissions
    // userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     /*
     // optional args. See docs for more details about args
      args: [
        {
          id: 'variablename',
          type: 'string',
          prompt: {
            start: 'What would you like?'
          },
          match: 'content'
        }
      ]
     */
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
      function formatMilli(millis) {
      let totalSeconds = millis / 1000;
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${hours} hour(s) and ${minutes} minute(s)`;
    }
    
    let mem = {}
    mem.used = Math.floor(process.memoryUsage().rss / 1048576);
    mem.total = Math.floor(require('os').totalmem() / 1048576);
    let embed = {
      title: `Statistics for ${this.client.user.username}`,
      color: `#${process.env.COLOR}`,
      fields: [
        {
          name: 'Memory Usage',
          value: `${mem.used}MB/${mem.total}MB`,
          inline: true
        },
        {
          name: 'Shard #',
          value: `${this.client.shard.ids[0]}`,
          inline: true
        },
        {
          name: 'Cached Users',
          value: `${this.client.users.cache.size}`,
          inline: true
        }, {
          name: 'Cached Guilds',
          value: `${this.client.guilds.cache.size}`,
          inline: true
        }, {
          name: 'Cached Channels',
          value: `${this.client.channels.cache.size}`,
          inline: true
        }, {
          name: 'Uptime',
          value: `${formatMilli(this.client.uptime)}`,
          inline: true
        }, {
          name: 'Discord.JS Version',
          value: `${require('discord.js').version}`,
          inline: true
        }, {
          name: 'Node.JS Version',
          value: `${process.version.slice(1)}`,
          inline: true
        },{
          name: 'Bot Version',
          value: `${require(path.join(__dirname, '../../../package.json')).version}`,
          inline: true
        }
      ],
      thumbnail: {url: `${this.client.user.displayAvatarURL()}`}
    }
    return message.channel.send({ embed })
  }
}

module.exports = StatisticsCommand;
