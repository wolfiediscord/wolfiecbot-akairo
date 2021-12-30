const { Command } = require('discord-akairo');
const embed = require('embed');
class SettingsCommand extends Command {
  constructor() {
    super('settings', {
      aliases: ['settings', 'config', 'setting'],
      description: {
        usage: ['<option> <value>'],
        content: `Configure the server settings.

        **Available Options**
        \`prefix\` - Sets the bot's prefix.
        \`verifyrole\` - Sets the role users get with \`verify\`.
        \`mutedrole\` - Sets the role users get with \`mute\`.
        \`logs\` - Sets the logging channel.
        \`modlogs\` - Sets the modlog channel.
        \`announcechnl\` - Sets the channel that \`announce\` sends announcements into.
        \`announcerole\` - Sets the role that \`announce\` pings. **Make sure that this role is publicly mentionable!**
        
        To set any option back to it's default (or nothing), use \`none\` as the value for that option.`,
        examples: ['mutedrole Muted', 'announcechnl #announcements', 'prefix $']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
     userPermissions: ['MANAGE_GUILD'],
     clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'option',
          type: (message, phrase) => {
          if(!phrase || !['prefix', 'verifyrole', 'mutedrole', 'logs', 'modlogs', 'announcechnl', 'announcerole'].includes(phrase.toLowerCase())) return null;
          return phrase.toLowerCase();
          },
          match: 'phrase',
          default: ''
        }, {
          id: 'value',
          type: 'string',
          match: 'rest',
          default: ''
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    switch(args.option) {
     case 'announcechnl':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')});
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'announcechannel', null);
        return message.channel.send({embed: embed.success('Successfully changed the announcement channel to default!')});
      } else {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args.value) || message.guild.channels.cache.get(args.value);
        if(!channel) return message.channel.send({embed: embed.error('That isn\'t a valid channel!')});
	if(channel.type !== 'text' && channel.type !== 'news') return message.channel.send({embed: embed.error('That isn\'t a valid channel!')});
        await this.client.settings.set(message.guild.id, 'announcechannel', channel.id);
        return message.channel.send({embed: embed.success(`Successfully changed the announcement channel to ${channel}!`)});
      }
      break;
     case 'modlogs':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')});
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'modlogs', null);
        return message.channel.send({embed: embed.success('Successfully changed the modlog channel to default!')});
      } else {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args.value) || message.guild.channels.cache.get(args.value);
        if(!channel) return message.channel.send({embed: embed.error('That isn\'t a valid channel!')});
    	if(channel.type !== 'text') return message.channel.send({embed: embed.error('That isn\'t a valid channel!')});
        await this.client.settings.set(message.guild.id, 'modlogs', channel.id);
        return message.channel.send({embed: embed.success(`Successfully changed the modlog channel to ${channel}!`)});
      }
      break;
      case 'logs':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')});
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'logs', null);
        return message.channel.send({embed: embed.success('Successfully changed the log channel to default!')});
      } else {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args.value) || message.guild.channels.cache.get(args.value);
        if(!channel) return message.channel.send({embed: embed.error('That isn\'t a valid channel!')});
	if(channel.type !== 'text') return message.channel.send({embed: embed.error('That isn\'t a valid channel!')});
        await this.client.settings.set(message.guild.id, 'logs', channel.id);
        return message.channel.send({embed: embed.success(`Successfully changed the log channel to ${channel}!`)});
      }
      break;
      case 'announcerole':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')});
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'announcerole', null);
        return message.channel.send({embed: embed.success('Successfully changed the announcement role to default!')});
      } else {
        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.value) || message.guild.roles.cache.get(args.value);
        if(!role) return message.channel.send({embed: embed.error('That isn\'t a valid role!')});
        if(!role.mentionable) return message.channel.send({embed: embed.error('That role isn\'t mentionable by everyone. Please make it mentionable by everyone!')});
        await this.client.settings.set(message.guild.id, 'announcerole', role.id);
        return message.channel.send({embed: embed.success(`Successfully changed the announcement role to ${role}!`)});
      }
      break;  
      case 'mutedrole':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')});
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'mutedrole', null);
        return message.channel.send({embed: embed.success('Successfully changed the muted role to default!')});
      } else {
        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.value) || message.guild.roles.cache.get(args.value);
        if(!role) return message.channel.send({embed: embed.error('That isn\'t a valid role!')});
        if(role.position >= message.guild.me.roles.highest.position) return message.channel.send({embed: embed.error('That role is higher than mine!')});
        await this.client.settings.set(message.guild.id, 'mutedrole', role.id);
        return message.channel.send({embed: embed.success(`Successfully changed the muted role to ${role}!`)});
      }
      break;
      case 'verifyrole':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')});
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'verifyrole', null);
        return message.channel.send({embed: embed.success('Successfully changed the verify role to default!')});
      } else {
        let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.value) || message.guild.roles.cache.get(args.value);
        if(!role) return message.channel.send({embed: embed.error('That isn\'t a valid role!')});
        if(role.position >= message.guild.me.roles.highest.position) return message.channel.send({embed: embed.error('That role is higher than mine!')});
        await this.client.settings.set(message.guild.id, 'verifyrole', role.id);
        return message.channel.send({embed: embed.success(`Successfully changed the verify role to ${role}!`)});
      }
      break;
      case 'prefix':
      if(args.value.length === 0) {
        return message.channel.send({embed: embed.error('You didn\'t put anything to change it to!')})
      } else if(args.value.toLowerCase() === 'none') {
        await this.client.settings.set(message.guild.id, 'prefix', null);
        return message.channel.send({embed: embed.success('Successfully changed the prefix to default!')});
      } else {
        await this.client.settings.set(message.guild.id, 'prefix', args.value);
        return message.channel.send({embed: embed.success(`Successfully changed the prefix to \`${args.value}\`!`)})
      }
      break;
      default:
      let sValues = {
        prefix: `\`${(this.client.settings.get(message.guild.id, 'prefix', `${process.env.PREFIX}`))}\``,
	verifyrole: message.guild.roles.cache.get(this.client.settings.get(message.guild.id, 'verifyrole')),
	mutedrole: message.guild.roles.cache.get(this.client.settings.get(message.guild.id, 'mutedrole')),
	announcerole: message.guild.roles.cache.get(this.client.settings.get(message.guild.id, 'announcerole')),
	announcechannel: message.guild.channels.cache.get(this.client.settings.get(message.guild.id, 'announcechannel')),
	modlogchannel: message.guild.channels.cache.get(this.client.settings.get(message.guild.id, 'modlogs')),
	logchannel: message.guild.channels.cache.get(this.client.settings.get(message.guild.id, 'logs')),
      }
      let settingsembed = {
        author: {
          name: `Settings for ${message.guild.name}`,
          icon_url: `${message.guild.iconURL()}`
        },
        color: `#${process.env.COLOR}`,
        description: `To change a setting, type: \`${this.client.settings.get(message.guild.id, 'prefix', `${process.env.PREFIX}`)}settings <option> <value>\`\nTo remove a setting, type: \`${this.client.settings.get(message.guild.id, 'prefix', `${process.env.PREFIX}`)}settings <option> none\``,
        fields: [
          {
            name: 'Prefix',
            value: sValues.prefix,
            inline: true
          }, {
            name: 'Verify Role',
            value: (sValues.verifyrole) ? sValues.verifyrole : 'None',
            inline: true
          }, {
            name: 'Muted Role',
            value: (sValues.mutedrole) ? sValues.mutedrole : 'None',
            inline: true
          }, {
            name: 'Announcement Role',
            value: (sValues.announcerole) ? sValues.announcerole : 'None',
            inline: true
          }, {
            name: 'Log Channel',
            value: (sValues.logchannel) ? sValues.logchannel : 'None',
            inline: true
          }, {
            name: 'Modlog Channel',
            value: (sValues.modlogchannel) ? sValues.modlogchannel : 'None',
            inline: true
          }, {
            name: 'Announcement Channel',
            value: (sValues.announcechannel) ? sValues.announcechannel : 'None',
            inline: true
          }
        ],
      };
      message.channel.send({embed: settingsembed});
      break;
    };
    return;
  }
} }

module.exports = SettingsCommand;
