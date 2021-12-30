const { Listener } = require('discord-akairo');
const dateFormat = require('dateformat');
class GuildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {
	// pretty easy. if the member is the same then return (not sure why discord would bother if it wasn't)
	if(oldMember === newMember) return;
      // role updates
	if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
	let embed = {
		author: {
		 	name: `Member Role Update`,
			icon_url: `${oldMember.user.displayAvatarURL()}`
		},
		description: `${oldMember.user.tag} (${oldMember.id})'s roles were updated.`,
		fields: [
			{
				name: 'Old Roles',
				value: `${(oldMember.roles.cache.map(r => r.name).length - 1 !== 0) ? oldMember.roles.cache.map(r => r.name).filter(n => n !== "@everyone").join(", ") : "None"}`
			}, 
			{
				name: 'New Roles',
				value: `${(newMember.roles.cache.map(r => r.name).length - 1 !== 0) ? newMember.roles.cache.map(r => r.name).filter(n => n !== "@everyone").join(", ") : "None"}`
	
			}
		],
		thumbnail: {
			url: `${oldMember.user.displayAvatarURL()}`
		},
		timestamp: new Date(),
		color: "#ffff00"
	};  
	this.client.emit('guild_log', oldMember.guild, embed);
	}
	// nickname updates
	if(oldMember.nickname !== newMember.nickname) {
	 let embed = {
	 	author: {
			name: `Nickname Changed`,
			icon_url: `${oldMember.user.displayAvatarURL()}`
		},
		description: `${oldMember.user.tag} (${oldMember.id})'s nickname was updated.`,
		fields: [
			{
				name: `Old Nickname`,
				value: `${(oldMember.nickname) ? oldMember.nickname : "None"}`
			},
			{
				name: `New Nickname`,
				value: `${(newMember.nickname) ? newMember.nickname : "None"}`

			}
		],	
		thumbnail: {
			url: `${oldMember.user.displayAvatarURL()}`
		},
		 timestamp: new Date(),
		 color: "#0066ff"
	 };
	 this.client.emit('guild_log', oldMember.guild, embed);
	 }
	// if it is a change we didn't account for, return
	// if(!embed) return;
	// do our logging!
	
    }
}

module.exports = GuildMemberUpdateListener;
