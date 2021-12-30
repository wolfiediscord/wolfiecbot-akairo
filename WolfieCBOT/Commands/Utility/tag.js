const { Command } = require('discord-akairo');
const embed = require('embed');
class TagCommand extends Command {
  constructor() {
    super('tag', {
      aliases: ['tag', 'tags'],
      description: {
        usage: ['<arguments..>'],
        content: 'Create useful tags that can be sent at any time!\n\n**Options**\n`create <title> <content>` - Creates a tag.\n`edit <title> <new content>` - Edit a existing tag.\n`delete <title>` - Delete a tag.\n`info <title>` - View info on a tag.',
        examples: ['', 'create hello Hello world!', 'edit hello Hello there!', 'view hello','delete hello']
      },
      category: 'Utility',
      // uncomment if you want a different cooldown than 3 seconds
     // cooldown: 5000,
     // ownerOnly: true,
     // uncomment if you want it to be guild only
      channel: 'guild',
     
     // permissions
   //  userPermissions: ['MANAGE_MESSAGES'],
     clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
     
     
     // optional args. See docs for more details about args
      args: [
        {
          id: 'option',
          type: 'string',
          match: 'phrase',
          default: '',
        }, {
          id: 'title',
          type: 'string',
          match: 'phrase',
          default: '',
        },
        {
          id: 'content',
          type: 'string',
          match: 'rest',
          default: ''
        }
      ]
     
    });
  }
  async exec(message, args) {
 // code here & make sure to always return, so akairo knows it's done
    const option = args.option;
    const title = args.title;
    const content = args.content;
     const tagdatabase = await this.client.db.all(
      `SELECT * FROM tags WHERE guildid = "${message.guild.id}"`
    );
    const tagdbguildandtitle = await this.client.db.all(
      `SELECT * FROM tags WHERE guildid = "${message.guild.id}" AND title = "${title}"`
    );
    const tagdbguildandoption = await this.client.db.all(
      `SELECT * FROM tags WHERE guildid = "${message.guild.id}" AND title = "${option}"`
    );
    switch (option) {
      case "info":
     await message.channel.send({embed: embed.error("This part of the command is no longer available. Please see the bot's website for the reason.")});
		    /*
      if(!title || tagdbguildandtitle.length === 0) {
        let errmsg = embed.error('Not a valid tag.');
        return message.channel.send({embed: errmsg});
      };
      let owner = this.client.users.cache.find(user => user.id === tagdbguildandtitle[0].ownerid);
      let embedd = {
        title: `Information on ${title}`,
        fields: [
          {
            name: `Owner`,
            value: `${owner.tag} (${tagdbguildandtitle[0].ownerid})`,
            inline: true
          }, {
            name: `Title`,
            value: `${title}`,
            inline: true
          }, {
            name: `Content`,
            value: `${tagdbguildandtitle[0].content}`,
            inline: false
          }
        ],
        color: `#${process.env.COLOR}`
      }
      message.channel.send({embed: embedd});
      */
      break;
      case "delete":
        await message.channel.send({embed: embed.error("This part of the command is no longer available. Please see the bot's website for the reason.")});
		    /*
	if (!title) {
          let errmsg = embed.error('Not a valid tag.')
          return message.channel.send({embed: errmsg});
        }
        if(tagdbguildandtitle.length === 0) {
          return message.channel.send({embed: embed.error('Not a valid tag.')})
        }
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
          await this.client.db.run(
            `DELETE FROM tags WHERE guildid = "${message.guild.id}" AND title = "${title}"`
          );
          let successdelete = embed.success(
            `Successfully deleted a tag named "${title}"!`
          );
          message.channel.send({ embed: successdelete });
          return;
        } else if (tagdbguildandtitle[0].owner === message.author.id) {
          await this.client.db.run(
            `DELETE FROM tags WHERE guildid = "${message.guild.id}" AND title = "${title}"`
          );
          let successdelete = embed.success(
            `Successfully deleted a tag named "${title}"!`
          );
          message.channel.send({ embed: successdelete });
          return;
        } else {
          let errmsg = embed.error('You do not have permission to delete this tag.');
          message.channel.send({embed: errmsg})
          return;
        } */
        break;
      case "edit":
        await message.channel.send({embed: embed.error("This part of the command is no longer available. Please see the bot's website for the reason.")});
       /* if (!title) {
          let errmsg = embed.error('Not a valid tag.');
          return message.channel.send({embed: errmsg});
        }
        if (tagdbguildandtitle.length === 0) {
          let errmsg = embed.error('Not a valid tag.');
          return message.channel.send({embed: errmsg})
        }
        if (tagdbguildandtitle[0].ownerid != message.author.id) {
          let errmsg = embed.error('You do not have permission to edit this tag.');
          return message.channel.send({embed: errmsg});
        }
        if (!content) {
          let errmsg = embed.error('You did not put anything to change the tag to.');
          return message.channel.send({embed: errmsg});
        }
        if (content.includes("@everyone") || content.includes("@here")) {
          let errmsg = embed.error('Tags cannot contain @everyone or @here.');
          return message.channel.send({embed: errmsg});
        }
        await this.client.db.run(
          `UPDATE tags SET content = "${content}" WHERE guildid = "${message.guild.id}" AND title = "${title}"`
        );
        let successedit = embed.success(`Successfully edited the tag named "${title}"!`)
        message.channel.send({embed: successedit});
	*/
        break;
      case "create":
	await message.channel.send({embed: embed.error("This part of the command is no longer available. Please see the bot's website for the reason.")});
        /*
	if (tagdbguildandtitle.length > 0) {
          let errmsg = embed.error('Tag already exists.');
          message.channel.send({embed: errmsg})
          return;
        }
        if (!title) {
          let errmsg = embed.error('No title was specified.');
          message.channel.send({embed: errmsg});
          return;
        } 
        if (!content) {
          let errmsg = embed.error('No content was specified.');
          message.channel.send({embed: errmsg});
          return;
        }
        if (content.includes("@everyone") || content.includes("@here")) {
          let errmsg = embed.error('Tags cannot contain @everyone or @here.');
          message.channel.send({embed: errmsg});
          return;
        }
        if (
          title.includes("create") ||
          title.includes("edit") ||
          title.includes("delete") ||
          title.includes("info")
        ) {
          let errmsg = embed.error(`You cannot create a tag with a command as it's title.`);
          message.channel.send({embed: errmsg});
          return;
        }
        await this.client.db.run(
          "INSERT INTO tags (guildid, ownerid, title, content) VALUES (?, ?, ?, ?)",
          [message.guild.id, message.author.id, title, content]
        );
        let successcreate = embed.success(`Successfully created a tag named "${title}"!`);
        message.channel.send({embed: successcreate}); */
        break;
      default:
        if (!option) {
          let tagnames = [];
          if (tagdatabase.length === 0) {
            tagnames = "There are no tags in this server.";
          } else {
            for (let i = 0; i < tagdatabase.length; i++) {
              await tagnames.push(`${tagdatabase[i].title}`);
            }
          }
          let tags = {
            author: {
              name: `Tags in ${message.guild.name}`,
              icon_url: message.guild.iconURL()
            },
		  description: `${(tagnames !== "There are no tags in this server.") ? tagnames.join(", ") : tagnames}`,
            color: `#${process.env.COLOR}`
          };
          message.channel.send({embed: tags});
        } else {
          if (tagdbguildandoption.length === 0) {
            let errmsg = embed.error(`There isn't a tag named ${option} on this server.`);
            return message.channel.send({embed: errmsg});
          }
          message.channel.send(`${tagdbguildandoption[0].content}`, {disableMentions: 'all', split: true});
        }
        break;
    }
    return;
  }
}

module.exports = TagCommand;
