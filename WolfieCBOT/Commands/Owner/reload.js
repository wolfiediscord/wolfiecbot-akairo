const { Command } = require("discord-akairo");
const embedMaker = require("embed");
class ReloadCommand extends Command {
  constructor() {
    super("reload", {
      aliases: ["reload", "rl"],
      category: "Owner",
      ownerOnly: true,
       description: {
        usage: ['<command>'],
        content: 'Reloads commands.',
        examples: ['help', 'ping']
      },
      args: [
        {
          id: "command",
          type: "string",
          prompt: {
            start: 'What command do you want to reload?'
          }
        }
      ],
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message, args) {
    let cmd = await this.client.commandHandler.findCommand(args.command);
    if (!cmd) {
      let notAcmd = embedMaker.error(
        "That isn't a valid command! Cancelled command."
      );
      return message.channel.send({ embed: notAcmd });
    }
      await this.client.shard.broadcastEval(`(async () => {
      let cmd = await this.commandHandler.findCommand('${args.command}');
      try {
      await cmd.reload();
      return true;
      } catch (err) {
      console.error('[SHARD ' + this.shard.ids[0] + '] An Error occured when reloading ' + cmd.aliases[0] + ' Full Error: ' + err);
      return false;
      }
      })()`).then(res => {
          if(!res.includes(true)) {
            let errmsg = embedMaker.error(`An error occured when reloading ${args.command}. Check console for more details.`);
            message.channel.send({embed: errmsg});
          } else {
            let success = embedMaker.success(
          `Successfully reloaded \`${args.command}\` across all shards!`
          );
      message.channel.send({ embed: success });
          }
      })
      return;
  }
}

module.exports = ReloadCommand;
