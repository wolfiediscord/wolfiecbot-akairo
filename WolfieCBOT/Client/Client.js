const { AkairoClient, CommandHandler, InhibitorHandler, SQLiteProvider, ListenerHandler } = require('discord-akairo');
const { Intents } = require('discord.js');
const path = require('path');
const sql = require('sqlite');
const embedMaker = require('embed');


class WolfClient extends AkairoClient {
  // methods
  constructor() {
    super({
      ownerID: [`${process.env.OWNERID}`],
    });
    this.db = sql;
    this.settings = new SQLiteProvider(sql.open(path.join(__dirname + '/../../db.sqlite')), 'settings', {
            idColumn: 'guildid'
    });
    this.info_msg = new SQLiteProvider(sql.open(path.join(__dirname + '/../../db.sqlite')), 'infomsg', {
      idColumn: 'shard_id'
    })
    // handlers/listeners
    this.commandHandler = new CommandHandler(this, {
      directory: path.join(__dirname + '/../Commands/'),
      prefix: async message => {
                if (message.guild) {
                    // The third param is the default.
                    let prefix = await this.settings.get(message.guild.id, 'prefix', `${process.env.PREFIX}`);
                    return prefix;
                }

                return `${process.env.PREFIX}`;
            },
      defaultCooldown: 3000,
      blockBots: true,
      blockClient: true,
      allowMention: true,
      argumentDefaults: {
        prompt: {
          modifyStart: (message, text) => {
            let embed = embedMaker.info(`${text}\nType \`cancel\` to cancel.`);
            embed.footer = {
              text: 'This command will be cancelled in 30 seconds.'
            };
            return { embed };
          },
          modifyTimeout: (message, text) => {
            let embed = embedMaker.error(`Out of time. Command cancelled.`);
            return { embed };
          },
          modifyCancel: (message, text) => {
            let embed = embedMaker.info('Cancelled command.');
            return { embed };
          },
          modifyRetry: (message, text) => {
            let embed = embedMaker.error(`${text}\nType \`cancel\` to cancel.`);
             embed.footer = {
              text: 'This command will be cancelled in 30 seconds.'
            };
            return { embed };
          },
          modifyEnded: (message, text) => {
            let embed = embedMaker.error('Out of tries. Command cancelled.');
            return { embed };
          }
        }
      }
    });
    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join(__dirname + '/../Listeners/')
    })
    // load everything
    this.commandHandler.loadAll();
    this.commandHandler.useListenerHandler(this.listenerHandler);
    // listeners
    this.listenerHandler.setEmitters({
      process: process,
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
  });
     this.listenerHandler.loadAll();
  }
  async login(token) {
        await this.settings.init();
        await this.info_msg.init();
        return super.login(token);
    }
}
const wolfIntents = new Intents();
wolfIntents.add('GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_PRESENCES')
let client = new WolfClient({}, {ws: { intents: wolfIntents }, messageCacheLifetime: 120, messageSweepInterval: 150});

client.login(`${process.env.TOKEN}`);
