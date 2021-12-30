const { Command } = require('discord-akairo');
const embed = require('embed');
class SayCommand extends Command {
  constructor() {
    super('say', {
      aliases: ['say'],
      description: {
        usage: ['<message>'],
        content: `Say something using the bot!
        
        **Available Flags**
        \`--c: <channel>\` - Send a message into a specific channel.`,
        examples: ['hello!', '--c: #general hello!']
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES','MANAGE_MESSAGES'],
     
     
     // optional args. See docs for more details about args
       args: [
        {
          id: 'text',
          type: 'string',
          prompt: {
            start: 'What do you want to say?'
          },
          match: 'text'
        }, {
          id: 'channel',
          match: 'option',
          type: 'textChannel',
          flag: '--c:',
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let channel;
    if(args.channel === null) {channel = message.channel} 
    else {channel = args.channel};
    try {
    if(message.channel === channel) {await message.delete() 
    await channel.send(args.text, {disableMentions: 'all'});} else {
    if(!channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return message.channel.send('I don\'t have permission to send messages in that channel!')
    await channel.send(args.text, {disableMentions: 'all'});
    let success = embed.success(`Successfully sent that message into ${channel}!`)
   await message.channel.send({embed: success});
    }
    } catch (err) {
    let errmsg = embed.error('Missing permissions to send a message into that channel.');
    await message.channel.send({embed: errmsg});
    };
    return;
  }
}

module.exports = SayCommand;