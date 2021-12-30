const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'client',
            event: 'error'
        });
    }

    exec(error) {
     console.error(`[SHARD ${this.client.shard.ids[0]}] Error: ${error}`);
     this.client.shard.broadcastEval(`(async () => {
     let owner = await this.users.cache.get('${process.env.OWNERID}');
     if(!owner) return false;
     let errmsg = {
        author: {
        name: 'Error from Shard ${this.client.shard.ids[0]}',
     
        }, 
        color: '#ff0000',
        description: '${error}',
        footer: {
        text: 'Error | ${dateFormat()}'
          }
        };
        try {
        owner.send({embed: errmsg});
        return true;
        } catch (err) {
        console.error('[SHARD ${this.client.shard.ids[0]}] Could not DM owner! Full Error: ' + err);
        return false
        }
     })()`).then(res => {
       if(!res.includes(true)) {
         console.error(`Owner could not be DMed! Look above for full error!`);
       }
     })
    }
}

module.exports = ErrorListener;