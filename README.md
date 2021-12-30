# WolfieCBOT
WolfieCBOT V4.1 is the most advanced version of WolfieCBOT yet! With discord-akairo to help it out, it can do much more than before!

## Installation
WolfieCBOT requires Node.JS Version 12 or higher. It is recommended to run WolfieCBOT on a Linux environment. WolfieCBOT is a sharding discord bot, which means it can be scaled to run on more than 2000 servers at once. 

To run WolfieCBOT, fill in the .env file with the following fields (you will need to create it)
```
# Get this from the Discord Developer Portal
TOKEN=

# This is your ID which is used for the eval and other owner only commands
OWNERID=
# This is the prefix your bot will respond with
PREFIX=""
# This is where the status message will be sent
LOGCHANNEL=
# This is where feedback from the feedback command is sent
FEEDBACKCHANNEL=

# This is the color of the embeds WITHOUT the hashtag
COLOR=
```

You will also need to create a file named `db.sqlite`, so the Discord bot can store prefixes, status messages, tags, and modlogs.

Then, start the bot using this command (or with your favorite Node.JS process manager)
```
node server.js
```

When the bot starts up, it will say `I'm ready!` for each individual shard.

### Credits
[The Discord.JS Project & Developers](https://github.com/discordjs/discord.js)
[The Discord-Akairo Project & Developers](https://github.com/discord-akairo/discord-akairo)
[Node.JS](https://nodejs.org)

## Command Template
If you wish to create your own commands, a template is below for you to get started.
```
const { Command } = require('discord-akairo');
class ExampleCommand extends Command {
  constructor() {
    super('example', {
      aliases: ['example'],
      description: {
        usage: ['<example>'],
        content: 'Example command. If you see this, contact the bot author.',
        examples: ['example']
      },
      category: 'Info',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
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
    return;
  }
}

module.exports = ExampleCommand;
```
## Listener Template
If you want to create your own listeners, a template is below to get started.
```
const { Listener } = require('discord-akairo');
class ExampleListener extends Listener {
    constructor() {
        super('example', {
            emitter: 'client',
            event: 'example'
        });
    }

    exec() {
      // code here
    }
}

module.exports = ExampleListener;
```
