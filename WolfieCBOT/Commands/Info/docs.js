const { Command } = require('discord-akairo');
const Doc = require('discord.js-docs');
const embed = require('embed');
class DocsCommand extends Command {
  constructor() {
    super('docs', {
      aliases: ['docs', 'djsdocs'],
      description: {
        usage: ['<query>'],
        content: `Searches the discord.js documentation for a query.

        **Available Flags**
        \`--src:\` - Search a specific branch of the docs.

        **Available Branches**
        \`stable\`, \`master\`, \`commando\`, \`rpc\`, \`akairo\``,
        examples: ['Message', 'GuildChannel --src:Master']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     /*
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['MANAGE_MESSAGES'],
     */
     clientPermissions: ['SEND_MESSAGES','EMBED_LINKS'],
     // optional args. See docs for more details about args
      args: [
        {
          id: 'query',
          type: 'string',
          prompt: {
            start: 'What do you want to search?'
          },
          match: 'text'
        }, {
          id: 'branch',
          match: 'option',
          flag: '--src:',
          type: (message, phrase) => {
          if(!phrase || !['stable', 'master', 'commando', 'rpc', 'akairo'].includes(phrase.toLowerCase())) return null;
          return phrase.toLowerCase();
          },
          default: 'stable',
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let doc;
    let link = "https://discord.js.org/static/logo-square.png"
    switch(args.branch) {
      case 'stable':
      doc = await Doc.fetch('stable', { force: true });
      break;
      case 'master':
      doc = await Doc.fetch('master', { force: true });
      break;
      case 'commando':
      doc = await Doc.fetch('commando', { force: true });
      break;
      case 'rpc':
      doc = await Doc.fetch('rpc', { force: true });
      break;
      case 'akairo':
      doc = await Doc.fetch('akairo-master', { force: true });
      link = null;
      break;
    };
    if(!doc) return message.channel.send({embed: embed.error('An error occured when searching for the discord.js documentation.')});
    try {
    let docsEmbed = await doc.resolveEmbed(args.query)
    if(!docsEmbed) return message.channel.send({embed: embed.error('That isn\'t in the discord.js docs. Try searching for something that exists!')});
    if(link) docsEmbed.author.icon_url = link;
    return message.channel.send({embed: docsEmbed});
    } catch (err) {
    console.error(err);
    return message.channel.send({embed: embed.error('An unknown error occured when searching the discord.js docs, and it has been reported to the bot developer.')});
    }
  }
}

module.exports = DocsCommand;