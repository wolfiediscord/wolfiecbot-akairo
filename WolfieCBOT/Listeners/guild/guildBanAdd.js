const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    exec(guild, user) {
      // code here
        let embed = {
    author: {
      name: `Member Banned`,
      icon_url: user.displayAvatarURL()
    },
    description: `${user.tag} (${user.id}) was banned from ${guild.name}.`,
    timestamp: new Date(),
    thumbnail: {
      url: user.displayAvatarURL()
    },
    color: "#ff0000"
    };
  this.client.emit('guild_log', guild, embed);
    }
}

module.exports = GuildBanAddListener;
