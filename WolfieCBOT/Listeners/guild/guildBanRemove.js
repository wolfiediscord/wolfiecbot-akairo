const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class GuildBanRemoveListener extends Listener {
    constructor() {
        super('guildBanRemove', {
            emitter: 'client',
            event: 'guildBanRemove'
        });
    }

    exec(guild, user) {
      // code here
       let embed = {
    author: {
      name: `Member Unbanned`,
      icon_url: user.displayAvatarURL()
    },
    description: `${user.tag} (${user.id}) was unbanned from ${guild.name}.`,
    timestamp: new Date(),
    thumbnail: {
      url: user.displayAvatarURL()
    },
    color: "#b7ff00"
  };
  this.client.emit('guild_log', guild, embed);
    }
}

module.exports = GuildBanRemoveListener;
