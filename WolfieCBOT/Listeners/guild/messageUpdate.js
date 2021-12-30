const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(oldMessage, newMessage) {
      // code here
  if(oldMessage.channel.type === 'dm') return;
  if (oldMessage.content === newMessage.content) return;
  if (newMessage.deleted === true) return;
  let oldMessageContent;
  if (!oldMessage.content) {
    oldMessageContent = "Uncached or an embed.";
  } else {
    oldMessageContent = oldMessage.content;
  }
  let newMessageContent;
  if (!newMessage.content) {
    newMessageContent = "Uncached or an embed.";
  } else {
    newMessageContent = newMessage.content;
  }
  let embed = {
    author: {
      name: `Message Updated`,
      icon_url: newMessage.author.avatarURL()
    },
    thumbnail: {
      url: newMessage.author.displayAvatarURL()
    },
    fields: [
      {
        name: "Message Author",
        value: `${newMessage.author.tag} (${newMessage.author.id})`
      },
      {
        name: "Channel",
        value: `${oldMessage.channel}`
      },
      {
        name: "Message ID",
        value: oldMessage.id
      },
      {
        name: "Old Message Content",
        value: oldMessageContent
      },
      {
        name: "New Message Content",
        value: newMessageContent
      }
    ],
    timestamp: new Date(),
    color: "#00ccff"
  };
  this.client.emit('guild_log', newMessage.guild, embed);
    }
}

module.exports = MessageUpdateListener;
