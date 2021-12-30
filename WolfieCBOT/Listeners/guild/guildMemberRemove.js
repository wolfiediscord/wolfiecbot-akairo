const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
      // code here
    let embed = {
    author: {
      name: `Member Left`,
      icon_url: member.user.displayAvatarURL()
    },
    description: `${member.user.tag} (${member.user.id}) left the server.`,
    timestamp: new Date(),
    thumbnail: {
      url: member.user.displayAvatarURL()
    },
    color: "#ffb300"
  };
  this.client.emit('guild_log', member.guild, embed);
    }
}

module.exports = GuildMemberRemoveListener;
