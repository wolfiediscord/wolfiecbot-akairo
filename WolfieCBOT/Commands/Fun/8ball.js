const { Command } = require('discord-akairo');
class EightBallCommand extends Command {
  constructor() {
    super('8ball', {
      aliases: ['8ball'],
      description: {
        usage: ['<question>'],
        content: 'Ask the magic 8ball about anything!',
        examples: ['will I have fun today?']
      },
      category: 'Fun',
       args: [
        {
          id: 'question',
          type: 'string',
          prompt: {
            start: 'What would you like to ask the magic 8ball?'
          },
          match: 'content'
        }
      ],
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
     // cooldown: 5000
    });
  }
  async exec(message) {
 // code here & make sure to always return, so akairo knows it's done
     let responses = [
    'Ask again later.',
    'Reply Hazy, ask again later.',
    'It is certain.',
    'It is likely.',
    'Maybe.',
    'It is possible.',
    'It is not possible.',
    'It will not happen.',
    'Most likely, it will not happen.',
    'Absolutely not.'
    ]
    let rn = Math.floor(Math.random() * responses.length);
    let msg = {
      author: {
        name: `🎱 The magic 8ball says...`,
      }, 
      description: `${responses[rn]}`,
      color: `#${process.env.COLOR}`
    };
    return message.channel.send({embed: msg});
  }
}

module.exports = EightBallCommand;