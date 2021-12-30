const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const embedMaker = require('embed');
class CatCommand extends Command {
  constructor() {
    super('cat', {
      aliases: ['cat', 'kitty'],
      description: {
        content: 'Get a random cat from random.cat!',
      },
      category: 'Fun',
      cooldown: 5000,
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message) {
 // code here & make sure to always return, so akairo knows it's done
   const { link } = await fetch('https://some-random-api.ml/img/cat').then(response => response.json()).catch(err => message.channel.send({embed: embedMaker.error(`An error occured when getting your cat!\n\nError: \`\`\`\n${err}\`\`\``)}))
   if(!link) return; 
   let embed = {
      title: 'Kitty!',
      description: 'Here is your kitty!',
      image: {
        url: `${link}`
      },
      footer: {
        text: `Powered by some-random-api.ml`
      },
      color: `#${process.env.COLOR}`
    };
    return message.channel.send({ embed });
  }
}

module.exports = CatCommand;