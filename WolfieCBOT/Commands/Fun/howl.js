const { Command } = require('discord-akairo');
class HowlCommand extends Command {
  constructor() {
    super('howl', {
      aliases: ['howl', 'awoo'],
      description: {
        content: 'Replies with a howl!'
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     
     // permissions
   //  userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES'],
     
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
    return message.reply('Awooooo!')
  }
}

module.exports = HowlCommand;