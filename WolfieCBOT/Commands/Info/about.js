const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
class AboutCommand extends Command {
  constructor() {
    super('about', {
      aliases: ['about', 'bot-info'],
      description: {
        content: 'Tells you the back story behind the bot.',
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     /*
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['MANAGE_MESSAGES'],
     */
     /*
     // optional args. See docs for more details about args
      args: [
        {
          id: 'variablename',
          type: 'string',
          prompt: {
            start: 'What would you like?'
          },
          match: 'content'
        }
      ]
     */
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let history = `WolfieCBOT is a discord bot originally coded in C#. After many years of abandonded development, it was remade in node.js. WolfieCBOT has more features than ever before and is constantly improving!`
    let res = await fetch('https://wolfiecbot.glitch.me/versions.json');
    let json = await res.json();
    let embed = {
      color: `#${process.env.COLOR}`,
      author: {
        name: `About ${this.client.user.tag}`,
        icon_url: `${this.client.user.avatarURL()}`
      },
      fields: [{
        name: 'History',
        value: history
      }, {
        name: `${json[0].name}`,
        value: '```diff\n' + json[0].changes + '```'
      }, {
        name: `${json[1].name}`,
        value: '```\n' + json[1].changes + '```'
      }]
    }
    return message.channel.send({ embed });
  }
}

module.exports = AboutCommand;