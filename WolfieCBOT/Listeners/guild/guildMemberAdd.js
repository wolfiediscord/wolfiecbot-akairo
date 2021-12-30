const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member) {
      // code here
      let embed = {
    author: {
      name: `Member Joined`,
      icon_url: member.user.displayAvatarURL()
    },
    description: `${member.user.tag} (${member.user.id}) joined the server!`,
    fields: [
      {
        name: `Joined Server At`,
        value: member.joinedAt,
        inline: false
      },
      {
        name: `Joined Discord At`,
        value: member.user.createdAt,
        inline: false
      }
    ],
    timestamp: new Date(),
    thumbnail: {
      url: member.user.displayAvatarURL()
    },
    color: "#55ff00"
  };
  this.client.emit('guild_log', member.guild, embed);
    }
}

module.exports = GuildMemberAddListener;
