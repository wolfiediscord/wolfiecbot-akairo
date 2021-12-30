const { Listener } = require('discord-akairo');
class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log(`[SHARD ${this.client.shard.ids[0]}] I\'m ready!`);
        this.client.user.setPresence({
          activity: {
            name: `${process.env.PREFIX}help | Shard ${this.client.shard.ids[0]}`
          }, status: 'online'
        })
        this.client.emit('check_stats');
        setInterval(() => {this.client.emit('check_stats')}, 60000 * 5)
	setInterval(() => {
	this.client.user.setPresence({
          activity: {
            name: `${process.env.PREFIX}help | Shard ${this.client.shard.ids[0]}`
          }, status: 'online'
        })
      }, 60000 * 30)	
    }
}

module.exports = ReadyListener;
