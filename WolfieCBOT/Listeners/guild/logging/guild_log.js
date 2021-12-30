const { Listener } = require('discord-akairo');
class GuildLogListener extends Listener {
    constructor() {
        super('guild_log', {
            emitter: 'client',
            event: 'guild_log'
        });
    }
    async exec(guild, embedToSend) {
      let logchannel = await this.client.settings.get(guild.id, 'logs');
      if(!logchannel || logchannel.length === 0 || logchannel === null) return;
      let channelToSend = await guild.channels.cache.get(`${logchannel}`);
      if(!channelToSend) return;
      if(!channelToSend.permissionsFor(guild.me).toArray().includes('EMBED_LINKS') || !channelToSend.permissionsFor(guild.me).toArray().includes('SEND_MESSAGES')) return;
      try {
      await channelToSend.send({ embed: embedToSend });
      } catch (err) {
      console.log(`[SHARD ${this.client.shard.ids[0]}] Could not send log. Full Error: ${err}`);
      }
    }
}

module.exports = GuildLogListener;