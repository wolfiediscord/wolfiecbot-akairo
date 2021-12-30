const { Command } = require('discord-akairo');
const embed = require('embed');
class NickCommand extends Command {
constructor() {
    super('nick', {
      aliases: ['nick'],
      description: {
        usage: ['<member> <new nickname | none>'],
        content: 'Sets the nickname of a member.\n\n**Available Flags**\n`--r:` - Reason for the nickname change. Make sure to surround it in quotation marks if your reason has spaces.',
        examples: ['Wolfie#7968 Wolf','Wolfie#7968 none', 'discordscam124#4326 bad guy --r: "This guy is a scammer!"']
      },
      category: 'Moderation',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     // permissions
     userPermissions: ['MANAGE_NICKNAMES'],
     clientPermissions: ['MANAGE_NICKNAMES'],
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: 'Who do you want to change the nickname for?',
            retry: 'Invalid member. Try again.'
          },
          match: 'phrase'
        },
        {
          id: 'nickname',
          type: 'string',
          prompt: {
            start: 'What do you want their nickname to be? Type `none` for nothing.'
          },
          match: 'rest'
        },
        {
          id: 'reason',
          match: 'option',
          flag: '--r:',
          default: 'No reason specified'
        }
      ]
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    if(!args.member.manageable) return message.channel.send({embed: embed.error('I can\'t set the nickname of that user!')});
    if(args.member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({embed: embed.error("You do not have permission to modify that user's nickname.")});
    let nickname = (args.nickname.toLowerCase() !== "none") ? args.nickname : "";
    try {
    await args.member.setNickname(nickname, `${message.author.tag} - ${args.reason}`);
    message.channel.send({embed: embed.success(`Successfully set the nickname of ${args.member} to ${(args.nickname.toLowerCase() !== "none") ? `\`${args.nickname}\`` : "nothing"}!`)});
    } catch (err) {
    console.error(`An error occured when setting the nickname of a user in ${message.guild.name}. Error: ${err}`);
    message.channel.send({embed: embed.error(`An error occured when setting the nickname of that user. Please report this error to the developer:\n\n\`\`\`${err}\`\`\``)});
    }
    return;
  }
}

module.exports = NickCommand;

