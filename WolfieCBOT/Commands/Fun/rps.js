const { Command } = require("discord-akairo");
const embedMaker = require("embed");
class RpsCommand extends Command {
  constructor() {
    super("rps", {
      aliases: ["rockpaperscissors", "rps"],
      description: {
        content: "Rock, Paper, Scissors! The classic game, now on discord with reactions!",
      },
      category: "Fun",
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
      // ownerOnly: true,
      // uncomment if you want it to be guild only
      // channel: 'guild',

      // permissions
      // userPermissions: ['MANAGE_MESSAGES'],
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS"],
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
  async exec(message) {
    // code here & make sure to always return, so akairo knows it's done
    const dictionary = ["🧱", "📄", "✂️"];
    let option = dictionary[Math.floor(Math.random() * 3)];
    let embed = {
      title: "Rock, Paper, Scissors!",
      description:
        "Choose an option! You have 5 seconds before it is auto cancelled.",
      color: `#${process.env.COLOR}`,
    };
    let msg = await message.channel
      .send({ embed })
      .catch((e) => console.error(e));
    try {
      await msg.react("🧱"); // rock
      await msg.react("📄"); // paper
      await msg.react("✂️"); // scissors
    } catch (e) {
      console.error(e);
      return message.channel.send({
        embed: embedMaker.error(
          `An error occured when reacting. Error: \`\`\`${e}\`\`\``
        ),
      });
    }
    let filter = (reaction, user) => {
      return (
        ["🧱", "📄", "✂️"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    msg
      .awaitReactions(filter, { max: 1, time: 5000, errors: ["time"] })
      .then(async (collected) => {
        const reaction = collected.first();
        switch (reaction.emoji.name) {
          case "🧱":
            if (option !== "📄" && option !== reaction.emoji.name) {
              // if bot chooses scissors
              embed.color = "GREEN";
              embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nYou win!`;
              msg.edit({ embed }).catch();
            } else if (reaction.emoji.name === option) {
                // if bot chooses rock
              embed.color = "YELLOW";
              embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nIt's a draw!`;
              msg.edit({ embed }).catch();
            } else {
                // if bot chooses paper
              embed.color = "RED";
              embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nYou lose!`;
              msg.edit({ embed }).catch();
            }
            break;
          case "📄":
            if (option !== "✂️" && option !== reaction.emoji.name) {
                // if bot chooses rock
                embed.color = "GREEN";
                embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nYou win!`;
                msg.edit({ embed }).catch();
              } else if (reaction.emoji.name === option) {
                  // if bot chooses paper
                embed.color = "YELLOW";
                embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nIt's a draw!`;
                msg.edit({ embed }).catch();
              } else {
                  // if bot chooses scissors
                embed.color = "RED";
                embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nYou lose!`;
                msg.edit({ embed }).catch();
              }
            break;
          case "✂️":
            if (option !== "🧱" && option !== reaction.emoji.name) {
                // if bot chooses paper
                embed.color = "GREEN";
                embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nYou win!`;
                msg.edit({ embed }).catch();
              } else if (reaction.emoji.name === option) {
                  // if bot chooses scissors
                embed.color = "YELLOW";
                embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nIt's a draw!`;
                msg.edit({ embed }).catch();
              } else {
                  // if bot chooses rock
                embed.color = "RED";
                embed.description = `I chose: ${option}\nYou chose: ${reaction.emoji}\n\nYou lose!`;
                msg.edit({ embed }).catch();
              }
            break;
          default:
            embed.color = "RED";
            embed.description =
              "You reacted with a different emoji! You automatically lose!";
            msg.edit({ embed }).catch();
            break;
        }
      })
      .catch((e) => {
        embed.color = "RED";
        embed.description = "You didn't react in time! You automatically lose!";
        msg.edit({ embed }).catch();
      });
    return;
  }
}

module.exports = RpsCommand;
