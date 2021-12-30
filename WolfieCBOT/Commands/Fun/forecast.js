const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const weather = require("weather-js");
const embed = require("embed");
const { stripIndents } = require('common-tags');
class ForecastCommand extends Command {
  constructor() {
    super('forecast', {
      aliases: ['forecast'],
      description: {
        usage: ['<location>'],
        content: `Gets a 7 day forecast for a location of your choice!

        **Available Flags**
        \`--c\` - Gets the forecast in Celcius`,
        examples: ['Chicago, IL', 'Chicago, IL --c']
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 10000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     
     // permissions
   //  userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     
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
    weather.find({ search: args.location, degreeType: degree }, (err, result) => {
      // error handling
      if (err) {
        console.log(err);
        let errmsg = embed.error(
          "An error occured when searching for the weather. Please try again later."
        );
        return message.channel.send({embed: errmsg});
      }

      // if there wasn't a search result
      if (result.length === 0) {
        let noResult = embed.error(
          `I couldn't find the weather of "${location}".`
        );
        return message.channel.send({embed: noResult});
      }

      // define our weather embed
      let weatherEmbed = new MessageEmbed().setAuthor(
        `Forecast for ${result[0].location.name}`,
        message.author.avatarURL()
      ).setColor(`#${process.env.COLOR}`);

      // our for loop for the 5 day forecast
      for (let i = 0; i < result[0].forecast.length; i++) {
        let forecast = {
          day: result[0].forecast[i].day,
          condition: result[0].forecast[i].skytextday,
          high: result[0].forecast[i].high,
          low: result[0].forecast[i].low,
          precip: ""
        };
        if (result[0].forecast[i].precip.length === 0) {
          forecast.precip = "0";
        } else {
          forecast.precip = result[0].forecast[i].precip;
        }
        weatherEmbed.addField(
          `${forecast.day}`,
          stripIndents`
            ${forecast.condition}
        High: ${forecast.high}°${degree}
        Low: ${forecast.low}°${degree}
        Precipitaion Chance: ${forecast.precip}%
          `
        , true);
      }
      
      message.channel.send(weatherEmbed)
    });
    return;
  }
}

module.exports = ForecastCommand;
