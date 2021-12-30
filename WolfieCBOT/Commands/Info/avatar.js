const { Command } = require('discord-akairo');
class AvatarCommand extends Command {
  constructor() {
    super('avatar', {
      aliases: ['avatar', 'icon', 'av'],
      description: {
        usage: ['(user)'],
        content: 'Get the avatar of a user or yourself!',
        examples: ['', 'avatar @Wolfie#7968']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     /*
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['MANAGE_MESSAGES'],
     */
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          default: message => message.member,
          match: 'content'
        }
      ],
     clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done

    let embed = {
      author: {
        name: `Avatar of ${args.member.user.tag}`,
        icon_url: `${args.member.user.displayAvatarURL()}`
      },
      color: `#${process.env.COLOR}`,
      image: {
        url: `${args.member.user.displayAvatarURL()}`
      }
    };
      return message.channel.send({ embed });
  }
}

module.exports = AvatarCommand;