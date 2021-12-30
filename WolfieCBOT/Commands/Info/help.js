const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'commands', 'cmds'],
      category: 'Info',
      description: {
        usage: ['<command>'],
        examples: ['ping'],
        content: 'Gets help on a command.'
      },
      cooldown: 5000,
      args: [
        {
        id: 'command',
        type: 'commandAlias'
        }
      ],
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
      channel: 'guild'
    });
  }
  async exec(message, args) {
    let command = args.command;
    if(!args.command) {
    let helpEmbed = new MessageEmbed()
    .setAuthor(`${this.client.user.username} Commands`, this.client.user.avatarURL())
    .setDescription(`The current server prefix is: \`${this.client.settings.get(message.guild.id, 'prefix', `${process.env.PREFIX}`)}\`\nTo view more details information on a command, type: \`${this.client.settings.get(message.guild.id, 'prefix', `${process.env.PREFIX}`)}help <command>\``)
    .setColor(`#${process.env.COLOR}`)
    .setFooter(`To view more detailed info on a command, type ${process.env.PREFIX}help <command>`);
      for (const category of this.handler.categories.values()) {
                helpEmbed.addField(`${category.id}`, `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(' ')}`);
            }
      return message.channel.send({embed: helpEmbed});
    } else {
    const embed = new MessageEmbed()
            .setColor(`#${process.env.COLOR}`)
            .setTitle(`\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''}\``)
            .addField('Description', `${command.description.content ? command.description.content : 'None'} ${command.ownerOnly ? '\n**[Owner Only]**': ''}`);
        if (command.category) embed.addField('Category', `${command.category}`, true);
        if (command.cooldown) embed.addField('Cooldown', `${command.cooldown / 1000} seconds.`)
        if (command.aliases.length > 1) embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);
        if (command.description.examples && command.description.examples.length) embed.addField('Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true);
        return message.channel.send({ embed });
    }
  }
}

module.exports = HelpCommand;