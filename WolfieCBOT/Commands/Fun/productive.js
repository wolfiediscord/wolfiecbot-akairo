const { Command } = require('discord-akairo');
class ProductiveCommand extends Command {
  constructor() {
    super('productive', {
      aliases: ['productive'],
      description: {
        content: 'Gives you a thing to do.',
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     
     // permissions
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
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS']
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
         let rn = (number) => {
            let random = Math.floor(Math.random() * number);
            return random;
        }
        let thingToDo = [];
        let thingToDoPusher = () => {
            let thingsToDo = [
                'Clean',
                'Do',
                'Make',
                'Find'
            ];
            thingToDo.push(thingsToDo[rn(thingsToDo.length)]);
        }
        thingToDoPusher();
        switch(thingToDo[0]) {
            case 'Clean':
            let cleanArray = [
                'the house',
                'the bathroom',
                'the hallway',
                'the living room',
                'the kitchen',
                'the bedroom'
            ];
            thingToDo.push(cleanArray[rn(cleanArray.length)] + '.')
            break;
            case 'Do':
            let doArray = [
                'your homework',
                'the laundry',
                'the dishes',
            ];
            thingToDo.push(doArray[rn(doArray.length)] + '.');
            break;
            case 'Make':
            let makeArray = [
                'a meal',
                'a song',
                'a new invention',
                'a new friend'
            ];
            thingToDo.push(makeArray[rn(makeArray.length)] + '.');
            break;
            case 'Find':
            let findArray = [
                'a new hobby',
                'a song that you haven\'t listened to',
                'something you haven\'t seen in a long time'
            ]
            thingToDo.push(findArray[rn(findArray.length)] + '.');
            break;
        }
        let msgEmbed = {
            author: {
                name: `Productive Things to Do`,
                icon_url: message.author.avatarURL()
            },
            color: `#${process.env.COLOR}`,
            description: `${thingToDo.join(' ')}`
        };
        return message.channel.send({embed: msgEmbed});
  }
}

module.exports = ProductiveCommand;