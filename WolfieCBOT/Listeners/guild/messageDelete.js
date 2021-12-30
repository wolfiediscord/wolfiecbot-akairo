const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    exec(message) {
      // code here
   if(message.channel.type === 'dm') return;
  let messagecontent;
  if (!message.content) {
    messagecontent = "Uncached or an embed.";
  } else {
    messagecontent = message.content;
  }
  let embed = {
    author: {
      name: `Message Deleted`,
      icon_url: message.author.displayAvatarURL()
    },
    fields: [
      {
        name: "Message Author",
        value: `${message.author.tag} (${message.author.id})`
      },
      {
        name: "Channel",
        value: message.channel
      },
      {
        name: "Message ID",
        value: message.id
      },
      {
        name: "Content",
        value: `${messagecontent}`
      }
    ],
    timestamp: new Date(),
    thumbnail: {
      url: message.author.displayAvatarURL()
    },
    color: "#ff0000"
  };
  this.client.emit('guild_log', message.guild, embed);
    }
}

module.exports = MessageDeleteListener;
