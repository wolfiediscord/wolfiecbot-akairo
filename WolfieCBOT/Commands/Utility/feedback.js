const { Command } = require('discord-akairo');
const embed = require('embed');
const dateFormat = require('dateformat');
const uniqid = require('uniqid')
class FeedbackCommand extends Command {
  constructor() {
    super('feedback', {
      aliases: ['feedback'],
      description: {
        usage: ['<option> <message>'],
        content: 'Send feedback or a bug report to the bot owner!\n\n**Options**\n`featurereq`, `bugrep`, `accept`, and `deny`.\n\n**Note**: Do not use the ` character in your feedback.',
        examples: ['featurereq Add commands!', 'bugrep Bot is broken.']
      },
      category: 'Utility',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
 //    userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'option',
          type: (message, phrase) => {
            if(!['featurereq', 'bugrep', 'accept', 'deny'].includes(phrase.toLowerCase())) return null;
            return phrase.toLowerCase();
          },
          prompt: {
            start: 'What option? Options are `featurereq`, `bugrep`, `accept`, and `deny`.',
            retry: 'Invalid option. Options are `featurereq`, `bugrep`, `accept`, and `deny`.'
          },
          match: 'phrase'
        }, {
          id: 'content',
          type: (message, phrase) => {
	  	if(phrase.includes("`") || !phrase) return null;
		return phrase;
	  },
          match: 'rest',
          prompt: {
            start: 'What do you want to say?',
	    retry: "You either didn't put anything, or you put a **`** in your content. Try again."
          }
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
	  await message.channel.send({embed: embed.error("This command is no longer available. Please see the bot's website for the reason.")});
	  /*
    const option = args.option;
    const content = args.content;
    	let feedbackchannel = process.env.FEEDBACKCHANNEL;
		if(!feedbackchannel) {
			let errmsg = embed.error('The feedback command is disabled.');
			message.channel.send({embed: errmsg})
			return;
		}
    switch(option) {
      case 'deny':
      if(message.author.id != process.env.OWNERID) {
        let noperm = embed.error('You do not have permission to deny feedback!');
        return message.channel.send({embed: noperm});
      }
      let feedbackToDeny = await this.client.db.all(`SELECT * FROM feedback WHERE id = "${content}"`);
      if(feedbackToDeny[0].length === 0) {
        let notAId = embed.error('That isn\'t a valid ID!');
        return message.channel.send({embed: notAId});
      }
      let denyMoreInput = embed.info('Why do you want to deny this feedback? This command will be cancelled in 30 seconds.')
      message.channel.send({embed: denyMoreInput}).then(() => {
	const filter = m => message.author.id === m.author.id;

	message.channel.awaitMessages(filter, { time: 30000, max: 1, errors: ['time'] })
		.then(messages => {
			let reason = messages.first().content;
      this.client.shard.broadcastEval(`(async () => {
      let user = this.users.cache.get('${feedbackToDeny[0].authorid}');
      if(!user) return false;
      let acceptmsg = {
            author: {
                name: 'Your feedback for ${this.client.user.username} was denied!',
                icon_url: this.user.avatarURL()
            },
            description: 'Your feedback was denied.',
            fields: [ {
                name: 'Type',
                value: '${feedbackToDeny[0].type}'
                },
                {
                    name: 'What you suggested',
                    value: '${feedbackToDeny[0].content}'
                }, {
                    name: 'When you suggested it',
                    value: '${dateFormat(feedbackToDeny[0].date)}'
                }, {
                    name: 'Reason',
                    value: '${reason}'
                }
            ], 
            thumbnail: {
                url: 'https://cdn.glitch.com/ac8acb68-7f8f-408a-9a2c-d1c5e7be3fc7%2Fx.png?v=1585782960249'
            },
            color: '#df0000',
            footer: {
                text: 'ID: ${feedbackToDeny[0].id}'
            }
        }
      try {
      user.send({embed: acceptmsg});
      return true;
      } catch (err) {
      console.error('[SHARD ' + this.shard.ids[0] + '] Error when sending deny message. Full Error: ' + err);
      return false;
      }
      })()
      `).then(res => {
        if(!res.includes(true)) {
         let nouser = embed.warn('I either couldn\'t find a user with that feedback ID, or I couldn\'t send the deny message.');
         message.channel.send({embed: nouser});
         this.client.db.run(`DELETE FROM feedback WHERE id = "${feedbackToDeny[0].id}"`)
        } else {
          let success = embed.success('Successfully denied feedback!');
          message.channel.send({embed: success})
          this.client.db.run(`DELETE FROM feedback WHERE id = "${feedbackToDeny[0].id}"`)
        }
      })
		})
		.catch(() => {
			let noInput = embed.error('You didn\'t respond in time! Cancelled command.');
      message.channel.send({embed: noInput});
		});
});
      break;
      case 'accept':
      if(message.author.id != process.env.OWNERID) {
        let noperm = embed.error('You do not have permission to accept feedback!');
        return message.channel.send({embed: noperm});
      }
      let feedbackToAccept = await this.client.db.all(`SELECT * FROM feedback WHERE id = "${content}"`);
      if(feedbackToAccept[0].length === 0) {
        let notAId = embed.error('That isn\'t a valid ID!');
        return message.channel.send({embed: notAId});
      }
      let acceptMoreInput = embed.info('Why do you want to accept this feedback? This command will be cancelled in 30 seconds.')
      message.channel.send({embed: acceptMoreInput}).then(() => {
	const filter = m => message.author.id === m.author.id;

	message.channel.awaitMessages(filter, { time: 30000, max: 1, errors: ['time'] })
		.then(messages => {
			let reason = messages.first().content;
      this.client.shard.broadcastEval(`(async () => {
      let user = this.users.cache.get('${feedbackToAccept[0].authorid}');
      if(!user) return false;
      let acceptmsg = {
            author: {
                name: 'Your feedback for ${this.client.user.username} was approved!',
                icon_url: this.user.avatarURL()
            },
            description: 'Your feedback was approved and will be added soon.',
            fields: [ {
                name: 'Type',
                value: '${feedbackToAccept[0].type}'
                },
                {
                    name: 'What you suggested',
                    value: '${feedbackToAccept[0].content}'
                }, {
                    name: 'When you suggested it',
                    value: '${dateFormat(feedbackToAccept[0].date)}'
                }, {
                    name: 'Reason',
                    value: '${reason}'
                }
            ], 
            thumbnail: {
                url: 'https://cdn.glitch.com/ac8acb68-7f8f-408a-9a2c-d1c5e7be3fc7%2Fcheckmark.png?v=1585782955418'
            },
            color: '#00b92f',
            footer: {
                text: 'ID: ${feedbackToAccept[0].id}'
            }
        }
      try {
      user.send({embed: acceptmsg});
      return true;
      } catch (err) {
      console.error('[SHARD ' + this.shard.ids[0] + '] Error when sending accept message. Full Error: ' + err);
      return false;
      }
      })()
      `).then(res => {
        if(!res.includes(true)) {
         let nouser = embed.warn('I either couldn\'t find a user with that feedback ID, or I couldn\'t send the accept message.');
         message.channel.send({embed: nouser});
         this.client.db.run(`DELETE FROM feedback WHERE id = "${feedbackToAccept[0].id}"`)
        } else {
          let success = embed.success('Successfully accepted feedback!');
          message.channel.send({embed: success})
          this.client.db.run(`DELETE FROM feedback WHERE id = "${feedbackToDeny[0].id}"`)
        }
      })
		})
		.catch(() => {
			let noInput = embed.error('You didn\'t respond in time! Cancelled command.');
      message.channel.send({embed: noInput});
		});
});
      break;
      case 'bugrep':
			message.channel.send('Sending...').then(async sentMessage => {
			let id = uniqid();
			await this.client.db.run("INSERT INTO feedback (guildid, authorid, type, content, date, id) VALUES (?,?,?,?,?,?)",
			[
				message.guild.id,
				message.author.id,
        'Bug Report',
				`${content}`,
				Date.now(),
				id
			]);
      await this.client.shard.broadcastEval(`(async => {
      let feedbackchannel = process.env.FEEDBACKCHANNEL;
      let channel = this.channels.cache.find(channel => channel.id === feedbackchannel);
      if(!channel) return false;
      let feedbackEmbed = {
			    author: {
					name: 'New Feedback',
					icon_url: '${message.author.avatarURL()}'
				}, 
				fields: [ {
					name: 'Guild',
					value: '${message.guild} (${message.guild.id})'
				},
				{
						name: 'Username',
						value: '${message.author.tag} (${message.author.id})'
				}, {
            name: 'Type',
            value: 'Bug Report'
        }, 
        {
						name: 'Content',
						value: \`${content}\`
					}, {
						name: 'ID',
						value: '${id}'
					}
				],
				color: '#ff6200',
				footer: {
					text: 'Feedback | ${dateFormat()}'
				},
				thumbnail: {
					url: '${message.author.avatarURL()}'
				}
			}
      try {
      channel.send({embed: feedbackEmbed}).catch(err => console.error);
      return true;
      } catch (err) {
      console.log(err)
      return false;
      }
})()`).then(res => {
      if(!res.includes(true)) {
        let errmsg = embed.error('I could not send your feedback due to an unknown error. Please contact the bot author.');
        return message.channel.send({embed: errmsg});
      } else {
      let success = embed.success(`Successfully Sent Feedback!
			Your Feedback ID is: ${id}`);
			sentMessage.delete().catch()
			message.channel.send({embed: success})
      }
      });
  });
      break;
      case 'featurereq':
			message.channel.send('Sending...').then(async sentMessage => {
			let id = uniqid();
			await this.client.db.run("INSERT INTO feedback (guildid, authorid, type, content, date, id) VALUES (?,?,?,?,?,?)",
			[
				message.guild.id,
				message.author.id,
        'Feature Request',
				content,
				Date.now(),
				id
			])
      await this.client.shard.broadcastEval(`(async => {
      let feedbackchannel = process.env.FEEDBACKCHANNEL;
      let channel = this.channels.cache.find(channel => channel.id === feedbackchannel);
      if(!channel) return false;
      let feedbackEmbed = {
			    author: {
					name: 'New Feedback',
					icon_url: '${message.author.avatarURL()}'
				}, 
				fields: [ {
					name: 'Guild',
					value: '${message.guild} (${message.guild.id})'
				},
				{
						name: 'Username',
						value: '${message.author.tag} (${message.author.id})'
				}, {
            name: 'Type',
            value: 'Feature Request'
        }, 
        {
						name: 'Content',
						value: \`${content}\`
					}, {
						name: 'ID',
						value: '${id}'
					}
				],
				color: '#00ce10',
				footer: {
					text: 'Feedback | ${dateFormat()}'
				},
				thumbnail: {
					url: '${message.author.avatarURL()}'
				}
			}
      try {
      channel.send({embed: feedbackEmbed});
      return true;
      } catch (err) {
      console.log(err)
      return false;
      }
})()`).then(res => {
      if(!res.includes(true)) {
        let errmsg = embed.error('I could not send your feedback due to an unknown error. Please contact the bot author.');
        return message.channel.send({embed: errmsg});
      } else {
      let success = embed.success(`Successfully Sent Feedback!
			Your Feedback ID is: ${id}`);
			sentMessage.delete().catch()
			message.channel.send({embed: success})
      }
      });
  });
      break;
    }
    return;
  } */
  }}

module.exports = FeedbackCommand;
