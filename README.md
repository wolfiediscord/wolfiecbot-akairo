# WolfieCBOT
WolfieCBOT V4.1 is the most advanced version of WolfieCBOT yet! With discord-akairo to help it out, it can do much more than before!

## Command Template
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