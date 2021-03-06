const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const embed = require('embed');
class MemeCommand extends Command {
  constructor() {
    super('meme', {
      aliases: ['meme', 'dankmeme'],
      description: {
        content: 'Gets a meme from r/dankmemes.',
      },
      category: 'Reddit',
      // uncomment if you want a different cooldown than 3 seconds
      cooldown: 5000,
      
      clientPermissions: ['SEND_MESSAGES','EMBED_LINKS']
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
  async exec(msg, args) {
 // code here & make sure to always return, so akairo knows it's done
async function fetchRedditData() {
  const res = await fetch("https://www.reddit.com/r/dankmemes/random/.json");
  const data = await res.json();
  if(data.error) return {error: true};
  return data[0].data.children[0].data;
}

//get image and title from data
async function getDATA() {
  const match = /.(jpg|png|gif)$/;
  const data = await fetchRedditData();
  if(data.error) return {img: null};
  //check if there is img and return img and title
  return {
    title: data.title,
    img: match.test(data.url)
      ? data.url
      : null,
    author: `u/${data.author}`,
    upvotes: data.ups,
    downvotes: data.downs
  };
}
    let data = await getDATA();
    if(data.img === null) {
      let errmsg = embed.error('An error occured and I couldn\'t get data from reddit. Please try again.');
      return msg.channel.send({embed: errmsg});
    }
    let Memeembed = {
      author: {
        name: 'Reddit | r/dankmemes',
        icon_url: 'https://cdn.glitch.com/898b1045-12bb-4aa1-8f45-3272e325121f%2Freddit.png?v=1590383676538'
      },
      title: `${(data.title.length < 256) ? data.title : 'Title Too Big For Discord'}`,
      description: `Posted by ${data.author}`,
      image: {
        url: data.img
      },
      footer: {
        text: `??? ${data.upvotes}`
      }, 
      color: `#${process.env.COLOR}`
    };
return msg.channel.send({embed: Memeembed});
  }
}

module.exports = MemeCommand;