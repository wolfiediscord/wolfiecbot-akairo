const { Command } = require('discord-akairo');
const embed = require('embed');
class UnlockCommand extends Command {
  constructor() {
    super('unlock', {
      aliases: ['unlock', 'unlockchannel'],
      description: {
        usage: ['<role>'],
        content: 'Unlocks a channel for a specified role.',
        examples: ['Member']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_CHANNELS'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_CHANNELS'],
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: 'What role do you want to unlock this channel for?',
            retry: 'Invalid role. Try again.'
          },
          match: 'content'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    if(message.channel.permissionsFor(args.role).toArray().includes("SEND_MESSAGES")) return message.channel.send({embed: embed.error('This channel isn\'t locked for that role!')});
    try {
    await message.channel.updateOverwrite(args.role, {
      SEND_MESSAGES: true
    }, `${message.author.tag} - Unlocking Channel`)
    return message.channel.send({embed: embed.success('Successfully unlocked this channel!')});
    } catch {
    return message.channel.send({embed: embed.error('An error occured when unlocking this channel.')})
    }
  }
}

module.exports = UnlockCommand;