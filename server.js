const { ShardingManager } = require('discord.js');
let Promise = require("bluebird");
const path = require('path');
const sql = require('sqlite');
const express = require('express');
const app = new express();
const util = require('util');
const dotenv = require('dotenv');
dotenv.config();
const manager = new ShardingManager(path.join(__dirname, 'WolfieCBOT/Client/Client.js'), { token: `${process.env.TOKEN}`});
let loadDB = async () => { 
let dbpath = path.resolve(__dirname, 'db.sqlite');
await sql.open(dbpath);
await sql.run( "CREATE TABLE IF NOT EXISTS warns (guildid TEXT, userid TEXT, modid TEXT, reason TEXT, type TEXT, warndate INT)");
  await sql.run("CREATE TABLE IF NOT EXISTS settings (guildid TEXT, prefix TEXT, verifyrole TEXT, logs TEXT, modlogs TEXT, mutedrole TEXT, announcechannel TEXT, announcerole TEXT)");
   await sql.run(
    "CREATE TABLE IF NOT EXISTS tags (guildid TEXT, ownerid TEXT, title TEXT, content TEXT)"
  );
  await sql.run("CREATE TABLE IF NOT EXISTS feedback (guildid TEXT, authorid TEXT, type TEXT, content TEXT, date INT, id TEXT)");
  await sql.run("CREATE TABLE IF NOT EXISTS infomsg (shard_id INT, message_id TEXT)");
};

loadDB();

try {
 manager.spawn().catch(console.error);
manager.on('shardCreate', shard => console.log(`[INFO] Successful launch of ${shard.id}!`))
} catch (err) {
  console.error(`Could not launch shards! ${err}`)
};
