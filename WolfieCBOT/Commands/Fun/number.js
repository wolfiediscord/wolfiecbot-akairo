const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
class NumberCommand extends Command {
  constructor() {
    super('number', {
      aliases: ['number', 'randomnumber', 'rn'],
      description: {
        content: 'Play the guessing game! Guess a number between 0-5!',
      },
      category: 'Fun',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 10000,
      
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS', 'ADD_REACTIONS']
     // ownerOnly: true,
     // uncomment if you want it to be guild only
     // channel: 'guild',
     /*
     // permissions
     userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['MANAGE_MESSAGES'],
     */
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
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    	 let rnumber = Math.floor(Math.random()*5)
  const numbermessage = new MessageEmbed()
    .setTitle("The Number")
    .setColor(`#${process.env.COLOR}`)
    .setDescription(
      `The number I was thinking of was **${rnumber}**.`
    );
     const confirmmsg = new MessageEmbed()
    .setTitle(`What number?`)
    .setColor(`#${process.env.COLOR}`)
    .setDescription(
      `What number am I thinking of? Guess from 0-5.`
    ).setFooter("🤔 You have 30 seconds to think it over!")
      message.channel.send(confirmmsg).then(async sentMessage => {
                sentMessage.react('0️⃣')
                .then(() => {
                            sentMessage.react('1️⃣')
                            sentMessage.react('2️⃣');
                            sentMessage.react('3️⃣');
                            sentMessage.react('4️⃣');
                            sentMessage.react('5️⃣');});

                const filter = (reaction, user) => {
                    return ['0️⃣','1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
                  };
                  
                  sentMessage.awaitReactions(filter, { max: 1, time: 30000, errors: ['time']})
                  .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '0️⃣') {
                      if(rnumber === 0) {
                        numbermessage.addField('You win!', 'You won! You guessed the right number! 🎉');
                        return message.channel.send(numbermessage)
                      } else {
                        numbermessage.addField('You lose!', 'You lost. You didn\'t guess the right number. 😞')
                        return message.channel.send(numbermessage)
                      }
                    }
                    if (reaction.emoji.name === '1️⃣') {
                      if(rnumber === 1) {
                        numbermessage.addField('You win!', 'You won! You guessed the right number! 🎉');
                        return message.channel.send(numbermessage)
                      } else {
                        numbermessage.addField('You lose!', 'You lost. You didn\'t guess the right number. 😞')
                        return message.channel.send(numbermessage)
                      }
                    } else if (reaction.emoji.name === '2️⃣') { 
                        if(rnumber === 2) {
                        numbermessage.addField('You win!', 'You won! You guessed the right number! 🎉');
                        return message.channel.send(numbermessage)
                      } else {
                        numbermessage.addField('You lose!', 'You lost. You didn\'t guess the right number. 😞')
                        return message.channel.send(numbermessage)
                      }
                    } else if (reaction.emoji.name === '3️⃣') { 
                        if(rnumber === 3) {
                        numbermessage.addField('You win!', 'You won! You guessed the right number! 🎉');
                        return message.channel.send(numbermessage)
                      } else {
                        numbermessage.addField('You lose!', 'You lost. You didn\'t guess the right number. 😞')
                        return message.channel.send(numbermessage)
                      }
                    } else if (reaction.emoji.name === '4️⃣') { 
                        if(rnumber === 4) {
                        numbermessage.addField('You win!', 'You won! You guessed the right number! 🎉');
                        return message.channel.send(numbermessage)
                      } else {
                        numbermessage.addField('You lose!', 'You lost. You didn\'t guess the right number. 😞')
                        return message.channel.send(numbermessage)
                      }
                    } else if (reaction.emoji.name === '5️⃣') { 
                        if(rnumber === 5) {
                        numbermessage.addField('You win!', 'You won! You guessed the right number! 🎉');
                        return message.channel.send(numbermessage)
                      } else {
                        numbermessage.addField('You lose!', 'You lost. You didn\'t guess the right number. 😞')
                        return message.channel.send(numbermessage)
                      }
                    }
                    else {
                      numbermessage.addField('You reacted with something else.', 'You lost by default. 😞')
                      message.channel.send(numbermessage);
                    }
                     })
                  .catch(collected => {
                    numbermessage.addField('You didn\'t react in time!', 'You lost by default. 😞')
                    message.channel.send(numbermessage)
                  });
            });
    return;
  }
}

module.exports = NumberCommand;