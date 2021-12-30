const { Command } = require('discord-akairo');
const embed = require('embed');
class InviteCommand extends Command {
  constructor() {
    super('invite', {
      aliases: ['invite', 'botinvite', 'bot-invite'],
      description: {
        content: 'Sends you an invite link for the bot!',
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
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let inviteEmbed = {
    color: `#${process.env.COLOR}`,
    author: {
      name: `Invite ${this.client.user.username} to your server!`,
      icon_url: `${this.client.user.displayAvatarURL()}`
    },
    description: 'Invite me to your server by clicking the link below!',
    fields: [
      {
        name: `Invite Bot`,
        value: `[Invite ${this.client.user.username}](https://discordapp.com/oauth2/authorize?client_id=309132696658116609&permissions=8&scope=bot)`,
        inline: true
      }, {
        name: 'Website',
        value: `[${this.client.user.username}'s website](https://wolfie.glitch.me/wolfiecbot)`,
        inline: true
      }
    ]
    };
    try {
    await message.author.send({embed: inviteEmbed});
    if(message.channel.type !== 'dm') return message.channel.send({embed: embed.success('Sent you a DM!')});
    return;
    } catch {
     return message.channel.send({embed: embed.error(`I couldn't DM you. Are your DMs on?`)}); 
    }
  }
}

module.exports = InviteCommand;