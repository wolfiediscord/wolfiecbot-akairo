const { Listener } = require('discord-akairo');

class UnhandledRejectionListener extends Listener {
    constructor() {
        super('unhandledRejection', {
            event: 'unhandledRejection',
            emitter: 'process'
        });
    }

    exec(error) {
        this.client.emit('error', `Unhandled Rejection! ${error}`)
    }
}

module.exports = UnhandledRejectionListener;

