const { Command } = require('discord-akairo');
const embed = require('embed');
class ClearCommand extends Command {
  constructor() {
    super('clear', {
      aliases: ['clear', 'purge', 'clean'],
      description: {
        usage: ['<# of messages>'],
        content: 'Clears x amount of messages.\n\n**Note**: Discord doesn\'t allow WolfieCBOT to delete messages older than 14 days.',
        examples: ['54', '20']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 10000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'number',
          type: 'integer',
          prompt: {
            start: 'How many messages do you want to clear?',
            retry: 'That\'s not a number. Try again.'
          },
          match: 'phrase'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    try {
    await message.delete().catch();
    await message.channel.bulkDelete(args.number);
    await message.channel.send({embed: embed.success(`Successfully cleared ${args.number} message(s)!`)}).then(sentMsg => {
      setTimeout(() => sentMsg.delete().catch((e) => null), 5000);
    })
    } catch {
    return message.channel.send({embed: embed.error('The messages I tried to delete were older than 14 days!')});
    }
    return;
  }
}

module.exports = ClearCommand;