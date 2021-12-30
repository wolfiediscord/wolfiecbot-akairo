const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const embedMaker = require('embed');
class FoxCommand extends Command {
  constructor() {
    super('fox', {
      aliases: ['fox'],
      description: {
        content: 'Get a random fox from some-random-api!',
      },
      category: 'Fun',
      cooldown: 5000,
      
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message) {
 // code here & make sure to always return, so akairo knows it's done
  const { link } = await fetch('https://some-random-api.ml/img/fox').then(response => response.json()).catch(err => message.channel.send({embed: embedMaker.error(`An error occured when getting your fox!\n\nError: \`\`\`\n${err}\`\`\``)}));
  if(!link) return;  
  let embed = {
      title: 'Fox!',
      description: 'Here is your fox!',
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

module.exports = FoxCommand;