const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class MessageDeleteBulkListener extends Listener {
    constructor() {
        super('messageDeleteBulk', {
            emitter: 'client',
            event: 'messageDeleteBulk'
        });
    }

    exec(messages) {
      // code here
   if(messages.first().channel.type === 'dm') return;
  let guild = messages.first().guild;
  
  let msgCount = messages.keyArray();
  let embed = {
    author: {
      name: `Bulk Messages Deleted`
    }, 
    fields: [
      {
        name: `Channel`,
        value: messages.first().channel
      }, {
        name: `Amount Deleted`,
        value: msgCount.length
      }
    ],
    color: '#ff0000',
    timestamp: new Date()
  }
  this.client.emit('guild_log', messages.first().guild, embed);
    }
}

module.exports = MessageDeleteBulkListener;
