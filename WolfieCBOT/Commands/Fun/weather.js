const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const weather = require("weather-js");
const embed = require("embed");
class WeatherCommand extends Command {
  constructor() {
    super('weather', {
      aliases: ['weather'],
      description: {
        usage: ['<location>'],
        content: `Gets the current weather for a location of your choice!

        **Available Flags**
        \`--c\` - Gets the weather in Celcius`,
        examples: ['Chicago, IL', 'Chicago, IL --c']
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 10000,
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
          id: 'location',
          type: 'string',
          prompt: {
            start: 'What location do you want to see the weather of?'
          },
          match: 'text'
        }, {
          id: 'degree',
          match: 'flag',
          flag: '--c'
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    let degree = 'F';
    if(args.degree) degree = 'C';
     weather.find({search: args.location, degreeType: degree}, function(err, result) {
  if(err) {
    console.log(err);
    let errmsg = embed.error('An error occured when searching for the weather. Please try again later.');
    return message.channel.send({embed: errmsg});
  }
  if(result.length === 0) {
    let noResult = embed.error(`I couldn't find the weather of "${location}". Is it a real location?`);
    return message.channel.send({embed: noResult});
  }
  let weatherEmbed = {
    author: {
      name: `Current Weather in ${result[0].location.name}`,
      icon_url: message.author.avatarURL()
    },
    fields: [ {
      name: `Conditions`,
      value: result[0].current.skytext,
      inline: true
    },
      {
        name: `Temperature`,
        value: `${result[0].current.temperature} °${degree}`,
        inline: true
      },
      {
        name: `Feels Like`,
        value: `${result[0].current.feelslike} °${degree}`,
        inline: true
      }, {
        name: `Humidity`,
        value: `${result[0].current.humidity}%`,
        inline: true
      }, {
        name: `Wind`,
        value: result[0].current.winddisplay,
        inline: true
      }
    ],
    thumbnail: {
      url: result[0].current.imageUrl
    }, 
    footer: {
    text: `Last Observed: ${result[0].current.observationtime} ${result[0].current.date}`
    },
    color: `#${process.env.COLOR}`
  };
  message.channel.send({embed: weatherEmbed});
});
    return;
  }
}

module.exports = WeatherCommand;