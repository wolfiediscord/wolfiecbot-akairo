const { Command } = require('discord-akairo');
const embedMaker = require('embed');
class LockCommand extends Command {
  constructor() {
    super('lock', {
      aliases: ['lock', 'lockchannel'],
      description: {
        usage: ['<role>'],
        content: 'Locks a channel for a specific role, so they cannot speak anymore.\n\n**Available Flags**\n`--r:` - Set the reason of the lock. Make sure to surround it in double quotes if you have spaces in the reason.',
        examples: ['everyone', 'Member --r: "Raid!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
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
            start: 'What role do you want to lock this channel for?',
            retry: 'Invalid role. Try again.'
          },
          match: 'text'
        },
        {
          id: 'reason',
          type: 'string',
          match: 'option',
          flag: '--r:',
          default: 'No reason provided.'
        }
      ]
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let embed = {
      title: '🔒 This channel has been locked!',
      description: `Reason: \`${args.reason}\`\nLocked For: \`${args.role.name}\``,
      footer: {text: `Locked by: ${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}`},
      color: `#${process.env.COLOR}`
    };
    try {
    await message.channel.updateOverwrite(args.role, {
      SEND_MESSAGES: false
    }, `${message.author.tag} - ${args.reason}`);
    return message.channel.send({ embed });
    } catch {
    return message.channel.send({embed: embedMaker.error('An error occured when locking this channel.')});
    }
  }
}

module.exports = LockCommand;