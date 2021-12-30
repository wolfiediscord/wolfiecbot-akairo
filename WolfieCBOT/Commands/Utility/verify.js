const { Command } = require('discord-akairo');
const uniqid = require('uniqid');
const embed = require('embed');
const dateFormat = require('dateformat');
class VerifyCommand extends Command {
  constructor() {
    super('verify', {
      aliases: ['verify'],
      description: {
        usage: ['(user)'],
        content: 'Verifies you into the server.',
        examples: ['', '@Wolfie#7968']
      },
      category: 'Utility',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
    // userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_ROLES', 'MANAGE_MESSAGES', 'KICK_MEMBERS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'member',
          type: 'member',
          match: 'content',
          default: '',
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let role = await message.guild.roles.cache.get(await this.client.settings.get(message.guild.id, 'verifyrole'));
    if(!role) return message.channel.send({embed: embed.error('There isn\'t a verification role set up! Set one using `settings`.')});
    let member = message.member;
    if(args.member){
      if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send({embed: embed.error('You do not have permission to verify other users!')});
      if(args.member.roles.cache.has(role.id)) return message.channel.send({embed: embed.error('That user is already verified!')});
      try {
      await args.member.roles.add(role, `${message.author.tag} is bypassing verification for this user.`);
      return message.channel.send({embed: embed.success(`Successfully bypassed verification for ${args.member}!`)});
      } catch {
      return message.channel.send({embed: embed.error('An unknown error occured when bypassing verification.')});
      }
    };
    if(member.roles.cache.has(role.id)) return message.channel.send({embed: embed.error('You are already verified!')});
    let id = uniqid();
    let verifyEmbed = {
    author: {
      name: `Verification for ${message.author.tag}`,
      icon_url: `${message.author.displayAvatarURL()}`
    },
    description: `Welcome to the server ${message.author}! In order to verify that you are not a bot, please type the following into chat.
    \`\`\`${id}\`\`\`
You have 2 minutes to type this in.

**DO NOT TYPE ANYTHING ELSE IN PAST THIS POINT OTHER THAN THE ID**`,
    color: 'YELLOW'
    };
    await message.channel.send({embed: verifyEmbed}).then(sentMsg => {
      const filter = m => {
        return m.author === message.author;
      }
message.channel.awaitMessages(filter, { max: 1, time: 60000 * 2, errors: ['time'] })
  .then(async collected => { 
  const msg = collected.first() 
  if(msg.content !== `${id}`) {
  let failVerify = {
    author: {
      name: `${message.author.tag} was kicked for failing verification!`,
      icon_url: `${message.author.displayAvatarURL()}`
    },
    description: `${message.author.tag} was kicked for failing verification.`,
    fields: [
      {
      name: 'Reason',
      value: `Did not type the correct ID.`
      }, {
        name: 'Verification ID',
        value: `${id}`
      }, {
        name: 'What they typed',
        value: `${msg.content}`
      }
    ],
    color: 'RED',
    footer: {
      text: `${dateFormat()}`
    }
  };
  await this.client.emit('guild_modlog', message.guild, failVerify);
  await message.member.kick(`Failed Verification - Reason: Typed incorrect ID`).catch();
  await message.channel.bulkDelete(3).catch();
  } else {
  let successVerify = {
    author: {
      name: `${message.author.tag} passed verification!`,
      icon_url: `${message.author.displayAvatarURL()}`
    },
    description: `${message.author.tag} successfully passed verification!`,
    fields: [
      {
        name: 'Verification ID',
        value: `${id}`
      }, {
        name: 'What they typed',
        value: `${msg.content}`
      }
    ],
    color: 'GREEN',
    footer: {
      text: `${dateFormat()}`
    }
  }
  await this.client.emit('guild_modlog', message.guild, successVerify);
  await message.member.roles.add(role, `Passed Verification.`).catch();
  await message.channel.bulkDelete(3).catch();
  }
  })
  .catch(async collected => {
  let failVerify = {
    author: {
      name: `${message.author.tag} was kicked for failing verification!`,
      icon_url: `${message.author.displayAvatarURL()}`
    },
    description: `${message.author.tag} was kicked for failing verification.`,
    fields: [
      {
      name: 'Reason',
      value: `Ran out of time.`
      }
    ],
    color: 'RED',
    footer: {
      text: `${dateFormat()}`
    }
  };
  await this.client.emit('guild_modlog', message.guild, failVerify);
  await message.member.kick(`Failed Verification - Reason: Ran out of time.`).catch();
  await message.channel.bulkDelete(2).catch();
    });
    })
    return;
  }
}

module.exports = VerifyCommand;