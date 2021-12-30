const { Listener } = require("discord-akairo");
const dateFormat = require("dateformat");
class CheckStatsListener extends Listener {
  constructor() {
    super("check_stats", {
      emitter: "client",
      event: "check_stats"
    });
  }

  async exec() {
    let messageToEdit = await this.client.info_msg.get(
      this.client.shard.ids[0],
      "message_id"
    );
    function millisToMinutesAndSeconds(millis) {
      let totalSeconds = millis / 1000;
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${days}D, ${hours}H, ${minutes}M`;
    }
    if (!messageToEdit || messageToEdit.length === 0) {
      this.client.shard
        .broadcastEval(
          `
      (async () => {
        let channel = await this.channels.cache.get('${
          process.env.LOGCHANNEL
        }');
        if(!channel) return null;

        let embed = {
        author: {
        name: 'Logged in as ${this.client.user.tag}',
        icon_url: this.user.avatarURL()
      },
      color: "#3cff00",
      description: 'Last checked: ${dateFormat()}',
      fields: [
        {
          name: 'Status',
          value: '${this.client.user.presence.status}',
          inline: true
        }, {
          name: 'Shard #',
          value: '${this.client.shard.ids[0]}',
          inline: true
        },
        {
          name: 'Users',
          value: '${this.client.users.cache.size}',
          inline: true
        },
        { name: 'Guilds', value: '${
          this.client.guilds.cache.size
        }', inline: true },
        {
          name: 'Last Restart At',
          value: '${dateFormat(this.client.readyTimestamp)}',
          inline: true
        },
        {
          name: 'Uptime',
          value: '${millisToMinutesAndSeconds(this.client.uptime)}',
          inline: true
        }
      ]
        };
        try {
        
        channel.send({ embed }).then(async sentMsg => {
        await this.info_msg.set('${
          this.client.shard.ids[0]
        }', 'message_id', sentMsg.id);
        });
        return true;
        } catch (err) {
        await console.error('Could not send info message into log channel. Full Error: ' + err);
        return false;
        }
        })()
        `
        )
        .then(results => {
          if (!results.includes(true))
            console.error(
              "No log channel found or another error occured. See above error."
            );
          console.log(
            `[INFO] Checked Shard ${
              this.client.shard.ids[0]
            } 's stats at ${dateFormat()}'`
          );
        });
    } else {
      this.client.shard
        .broadcastEval(
          
      `(async () => {
      let channel = await this.channels.cache.get('${process.env.LOGCHANNEL}');
        if(!channel) return null;
        let embedD = {
        author: {
        name: 'Logged in as ${this.client.user.tag}',
        icon_url: this.user.avatarURL()
      },
      color: "#3cff00",
      description: 'Last checked: ${dateFormat()}',
      fields: [
        {
          name: 'Status',
          value: '${this.client.user.presence.status}',
          inline: true
        }, {
          name: 'Shard #',
          value: '${this.client.shard.ids[0]}',
          inline: true
        },
        {
          name: 'Users',
          value: '${this.client.users.cache.size}',
          inline: true
        },
        { name: 'Guilds', value: '${this.client.guilds.cache.size}', inline: true },
        {
          name: 'Last Restart At',
          value: '${dateFormat(this.client.readyTimestamp)}',
          inline: true
        },
        {
          name: 'Uptime',
          value: '${millisToMinutesAndSeconds(this.client.uptime)}',
          inline: true
        }
      ]
        };
      let messageToEdit = await this.info_msg.get(
      ${this.client.shard.ids[0]},
      "message_id"
    );
      channel.messages.fetch(messageToEdit).then(async msg => {
      try {
      await msg.edit({ embed: embedD })
      } catch (err) {
      console.error("Could not update log message. Error: " + err);
      }
      }).catch(async err => {
      channel.send({ embed: embedD }).then(sentMsg => {
      this.info_msg.set(${this.client.shard.ids[0]}, 'message_id', sentMsg.id);
});
      console.error(err)
      await console.error('Could not edit log message due to an unknown error. Full error: ' + err);
      });
      return true;
      })()
      `
        )
        .then(results => {
          if (!results.includes(true))
            console.error(
              "No log channel found or another error occured. See above error."
            );
          console.log(
            `[INFO] Checked Shard ${
              this.client.shard.ids[0]
            } 's stats at ${dateFormat()}`
          );
        });
    }
  }
}

module.exports = CheckStatsListener;
