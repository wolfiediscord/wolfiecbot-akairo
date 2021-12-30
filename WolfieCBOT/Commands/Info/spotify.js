const { Command } = require('discord-akairo');
const dateFormat = require('dateformat');
const embed = require('embed');
const request = require('request');
class SpotifyCommand extends Command {
  constructor() {
    super('spotify', {
      aliases: ['spotify', 'spotify-status'],
      description: {
        usage: ['(user)'],
        content: 'Get\'s a user\'s spotify status.',
        examples: ['', '@Wolfie#7968']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
    //  channel: 'guild',
     
     // permissions
   //  userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'user',
          type: 'relevant',
          match: 'content',
          default: message => message.author
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    const activity = args.user.presence.activities.find(a => a.name === 'Spotify' && a.type === 'LISTENING');
    if(!activity) return message.channel.send({embed: embed.error('You or the user you specified are not listening to spotify!')});
    let fetchImage = () => {
      return new Promise((resolve, reject) => {
        request(`https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`, (err, res, body) => {
          if(!err && res.statusCode === 200) {resolve(`https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`)} else {
            reject(`https://cdn.glitch.com/898b1045-12bb-4aa1-8f45-3272e325121f%2Fspotify_logo.png?v=1601662957010`)
          }
        })
      })
    };
    let image = await fetchImage();
    const spotifyEmbed = {
      author: {
        name: `Spotify`,
        icon_url: `https://cdn.glitch.com/898b1045-12bb-4aa1-8f45-3272e325121f%2Fspotify_logo.png?v=1601662957010`
      },
      title: `${args.user.tag} is currently listening to:`,
      description: `${activity.details} by ${activity.state}.\n\nStarted Listening At: \`${dateFormat(activity.createdTimestamp, 'longTime')}\``,
      color: `#${process.env.COLOR}`,
      thumbnail: {
        url: image
      }
    }
    return message.channel.send({embed: spotifyEmbed});
  }
}

module.exports = SpotifyCommand;