const { Command } = require('discord-akairo');
const embedMaker = require('embed');
class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval','evaluate'],
      ownerOnly: true,
      category: 'Owner',
       description: {
        usage: ['<code>'],
        content: 'Evaluates JavaScript code.',
        examples: ['console.log(1 + 1)', 'message.channel.send(`Hello!`)']
      },
      args: [
        {
          id: 'code',
          type: 'string',
          prompt: {
            start: 'Please put the code you want to run.'
          },
          match: 'content'
        }
      ],
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  exec(message, args) {
    let code = args.code;
    message.embed = (embed) => {
      message.channel.send({ embed });
    }
    function splitNChars(txt, num) {
      var result = [];
      for (var i = 0; i < txt.length; i += num) {
        result.push(txt.substr(i, num));
      }
      return result;
    }
    function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
  try {
    let evaled = eval(code)
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    let inputcode = code;
    let outputcode = clean(evaled);
    if(inputcode.length > 1024 && outputcode.length > 1024) {
      let inputCode = splitNChars(inputcode, 1024);
          let inputembedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Input: \`\`\`js
${inputCode[0]}\`\`\``,
              color: '#00ff1e'
            }
          ];
          for (let i = 1; i < inputCode.length; i++) {
            inputembedArray.push({
              description: `\`\`\`\js
${inputCode[i]} \`\`\``,
              color: '#00ff1e'
            })
          }
          inputembedArray.forEach(entry => {
          message.channel.send({embed: entry});
        })
      let outputCode = splitNChars(outputcode, 1024);
          let outputembedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Output: \`\`\`js
${outputCode[0]}\`\`\``,
              color: '#00ff1e'
            }
          ];
          for (let i = 1; i < outputCode.length; i++) {
            outputembedArray.push({
              description: `\`\`\`\js
${outputCode[i]} \`\`\``,
              color: '#00ff1e'
            })
          }
          outputembedArray.forEach(entry => {
          message.channel.send({embed: entry});
          })
        return;
    }
    else if(inputcode.length > 1024) {
      let errmsg = splitNChars(inputcode, 1024);
          let embedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Input: \`\`\`js
${errmsg[0]}\`\`\``,
              color: '#00ff1e'
            }
          ];
          for (let i = 1; i < errmsg.length; i++) {
            embedArray.push({
              description: `\`\`\`\js
${errmsg[i]}\`\`\``,
              color: '#00ff1e'
            })
          }
          embedArray.forEach(entry => {
          message.channel.send({embed: entry});
        })
        let outputEmbed = {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Output: \`\`\`js
${outputcode}\`\`\``,
              color: '#00ff1e'
            }
        message.channel.send({embed: outputEmbed})
        return;
    } else if(outputcode.length > 1024) {
      let outputEmbed = {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Input: \`\`\`js
${inputcode}\`\`\``,
              color: '#00ff1e'
            }
        message.channel.send({embed: outputEmbed})
      let outputCode = splitNChars(outputcode, 1024);
          let outputembedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Output: \`\`\`js
${outputCode[0]}\`\`\``,
              color: '#00ff1e'
            }
          ];
          for (let i = 1; i < outputCode.length; i++) {
            outputembedArray.push({
              description: `\`\`\`\js
${outputCode[i]} \`\`\``,
              color: '#00ff1e'
            })
          }
          outputembedArray.forEach(entry => {
          message.channel.send({embed: entry});
          })
        return;
    }
    let embed = {
      author: {
      name: '💻Eval Results',
      icon_url: this.client.user.avatarURL()
      },
      fields: [
        {
          name: `Input`,
          value: `\`\`\`js\n${code}\n\`\`\``
        }, {
          name: `Output`,
           value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
        }
      ],
      color: '#00bf0a'
    }
  /*  if(code.length >= 1024 || `${clean(evaled)}` >= 1024) {
      message.say('Results too big for embeds. Falling back to messages!');
       message.say(`📥Input:
\`\`\`js\n${code}\n\`\`\``, { split: true });
      message.say(`📤Output: 
\`\`\`js\n${clean(evaled)}\n\`\`\``, { split: true })
    }
    */
    message.channel.send({embed: embed});
  } catch (err) {
     let inputcode = code;
    let outputcode = clean(err);
       if(inputcode.length > 1024 && outputcode.length > 1024) {
      let inputCode = splitNChars(inputcode, 1024);
          let inputembedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Input: \`\`\`js
${inputCode[0]}\`\`\``,
              color: '#ed0505'
            }
          ];
          for (let i = 1; i < inputCode.length; i++) {
            inputembedArray.push({
              description: `\`\`\`\js
${inputCode[i]} \`\`\``,
              color: '#ed0505'
            })
          }
          inputembedArray.forEach(entry => {
          message.channel.send({embed: entry});
        })
      let outputCode = splitNChars(outputcode, 1024);
          let outputembedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Output: \`\`\`js
${outputCode[0]}\`\`\``,
              color: '#ed0505'
            }
          ];
          for (let i = 1; i < outputCode.length; i++) {
            outputembedArray.push({
              description: `\`\`\`\js
${outputCode[i]} \`\`\``,
              color: '#ed0505'
            })
          }
          outputembedArray.forEach(entry => {
          message.channel.send({embed: entry});
          })
        return;
    }
    else if(inputcode.length > 1024) {
      let errmsg = splitNChars(inputcode, 1024);
          let embedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Input: \`\`\`js
${errmsg[0]}\`\`\``,
              color: '#ed0505'
            }
          ];
          for (let i = 1; i < errmsg.length; i++) {
            embedArray.push({
              description: `\`\`\`\js
${errmsg[i]}\`\`\``,
              color: '#ed0505'
            })
          }
          embedArray.forEach(entry => {
          message.channel.send({embed: entry});
        })
        let outputEmbed = {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Output: \`\`\`js
${outputcode}\`\`\``,
              color: '#ed0505'
            }
        message.channel.send({embed: outputEmbed})
        return;
    } else if(outputcode.length > 1024) {
      let outputEmbed = {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Input: \`\`\`js
${inputcode}\`\`\``,
              color: '##ed0505'
            }
        message.channel.send({embed: outputEmbed})
      let outputCode = splitNChars(outputcode, 1024);
          let outputembedArray = [
            {
              author: {
                name: `💻Eval Results`,
                icon_url: this.client.user.avatarURL()
              },
              description: `Output: \`\`\`js
${outputCode[0]}\`\`\``,
              color: '#ed0505'
            }
          ];
          for (let i = 1; i < outputCode.length; i++) {
            outputembedArray.push({
              description: `\`\`\`\js
${outputCode[i]} \`\`\``,
              color: '#ed0505'
            })
          }
          outputembedArray.forEach(entry => {
          message.channel.send({embed: entry});
          })
        return;
    }
    let embed = {
      author: {
        name: `Eval Results`,
        icon_url: this.client.user.avatarURL()
      },
      fields: [
        {
          name: `Input`,      
          value: `\`\`\`js\n${code}\n\`\`\``
        }, {
          name: `Output`,
          value: `Error: \`\`\`js\n${clean(err)}\n\`\`\``
        }
      ],
      color: '#ed0505'
    }
     /*if(code.length >= 1024 || `${clean(err)}` >= 1024) {
      message.say('Results too big for embeds. Falling back to messages!');
      message.say(`📥Input:
\`\`\`js\n${code}\n\`\`\`
`, { split: true });
       message.say(`📤Output:
**ERROR**
\`\`\`js\n${clean(err)}\n\`\`\``, { split: true });
       return;
    } */
    message.channel.send({embed: embed});
}
  }
}

module.exports = EvalCommand;