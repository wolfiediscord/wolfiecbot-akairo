const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const embedMaker = require('embed');
class DogCommand extends Command {
  constructor() {
    super('dog', {
      aliases: ['dog', 'puppy', 'doggo'],
      description: {
        content: 'Get a random dog from dog.ceo!',
      },
      category: 'Fun',
      cooldown: 5000,
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(msg) {
 // code here & make sure to always return, so akairo knows it's done
     const { message } = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json()).catch(err => message.channel.send({embed: embedMaker.error(`An error occured when getting your dog!\n\nError: \`\`\`\n${err}\`\`\``)}));
     if(!message) return;
     let embed = {
      title: 'Dog!',
      description: 'Here is your dog!',
      image: {
        url: `${message}`
      }, 
      footer: {
        text: `Powered by dog.ceo`
      },
      color: `#${process.env.COLOR}`
    };
    return msg.channel.send({ embed });
  }
}

module.exports = DogCommand;