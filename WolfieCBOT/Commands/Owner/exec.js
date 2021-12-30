const { Command } = require('discord-akairo');
const embed = require('embed');
let exec = require("child_process").exec;
class ExecCommand extends Command {
  constructor() {
    super('exec', {
      aliases: ['exec', 'terminal'],
      description: {
        content: 'Executes shell commands.',
        usage: ['<command>'],
        examples: ['ls', 'ls node_modules']
      },
      category: 'Owner',
      ownerOnly: true,
      args: [
        {
          id: 'code',
          type: 'string',
          prompt: {
            start: 'What do you want to run?'
          },
          match: 'content'
        }
      ],
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
   let code = args.code;
    function splitNChars(txt, num) {
      var result = [];
      for (var i = 0; i < txt.length; i += num) {
        result.push(txt.substr(i, num));
      }
      return result;
    }
    exec(code, (error, stdout, stderr) => {
      if (error) {
        let err = error.toString();
        if (err.length > 1024) {
          let errmsg = splitNChars(err, 1024);
          let embedArray = [
            {
              author: {
                name: `💻Terminal Results: Error`,
                icon_url: this.client.user.avatarURL()
              },
              description: `\`\`\`${errmsg[0]}\`\`\``,
              color: '#ff0000'
            }
          ];
          for (let i = 1; i < errmsg.length; i++) {
            embedArray.push({
              description: `\`\`\`\ ${errmsg[i]} \`\`\``,
              color: '#ff0000'
            })
          }
          embedArray.forEach(entry => {
          message.channel.send({embed: entry});
        })
        return;
        }
        let errEmbed = {
          author: {
            name: `💻Terminal Results: Error`,
            icon_url: this.client.user.avatarURL()
          },
          description: `\`\`\`${err}\`\`\``,
          color: '#ff0000'
        }
        return message.channel.send({embed: errEmbed});
      }
      let output = stdout.toString();
      if(output.length > 1024) {
          let errmsg = splitNChars(output, 1024);
          let embedArray = [
            {
              author: {
                name: `💻Terminal Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `\`\`\`${errmsg[0]}\`\`\``,
              color: '#00ff1e'
            }
          ];
          for (let i = 1; i < errmsg.length; i++) {
            embedArray.push({
              description: `\`\`\`\ ${errmsg[i]} \`\`\``,
              color: '#00ff1e'
            })
          }
          embedArray.forEach(entry => {
          message.channel.send({embed: entry})
        })
        return;
      }
      let outEmbed = {
        author: {
                name: `💻Terminal Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `\`\`\`${output}\`\`\``,
              color: '#00ff1e'
      }
      message.channel.send({embed: outEmbed});
      });
    return;
         }
         }

module.exports = ExecCommand;