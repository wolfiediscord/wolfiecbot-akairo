const { Command } = require('discord-akairo');
const dateFormat = require('dateformat');
const fetch = require('node-fetch');
class ChangelogCommand extends Command {
  constructor() {
    super('changelog', {
      aliases: ['changelog', 'changelogs'],
      description: {
        content: 'View the changelogs of WolfieCBOT',
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     
     // permissions
  //   userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
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
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let res = await fetch('https://wolfiecbot.glitch.me/versions.json');
    let json = await res.json();
    let embed = {
      author: {
        name: `Changelogs for ${this.client.user.username}`,
        icon_url: `${this.client.user.displayAvatarURL({format: 'png'})}`
      },
      title: `Changes in ${json[0].name}`,
      description: '```diff\n' + json[0].changes + '```',
      footer: {
        text: `${dateFormat()}`
      },
      color: `#${process.env.COLOR}`
    }
    return message.channel.send({ embed });
  }
}

module.exports = ChangelogCommand;