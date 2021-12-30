const { Command } = require('discord-akairo');
class EmojiCommand extends Command {
  constructor() {
    super('emoji', {
      aliases: ['emoji'],
      description: {
        usage: ['<emoji>'],
        content: 'Use a emoji in your server without nitro!',
        examples: ['Thonk']
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
   //  userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'emoji',
          type: 'emoji',
          prompt: {
            start: 'What is the name of the emoji?',
            retry: 'That\'s not a valid emoji. Try again.'
          }
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
     let emoji = {
    description: `${message.author.tag}: ${args.emoji}`,
    color: `#${process.env.COLOR}`
  };
  message.delete().catch();
  return message.channel.send({embed: emoji});
  }
}

module.exports = EmojiCommand;