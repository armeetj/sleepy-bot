//armeet
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

//reading token
fs.readFile('token.txt', 'utf8', (err, data) =>
{
    //login with the bot token
    try
    {
      client.login(data);
    } catch(e)
    {
        console.log(err.lineNumber);
    }

});


//when bot is online, log to console
client.on('ready', () =>
{
  try{
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Serving in "+ client.guilds.size + " guilds.\n");
    console.log("guilds: \n");

    var keyArray = Array.from(client.guilds.keys());
    console.log(keyArray)
    for(var i = 0; i < client.guilds.size; i++)
    {
        console.log("server: " + client.guilds.get(keyArray[i]).name + ", id: "+ keyArray[i]);
    }
    console.log("\n")
  }catch(error)
  {

  }
});


//when client joins a new server

client.on("guildCreate", (newGuild)=>
{
  try{
    fs.readFile('serverinfo.json','utf8',(err, data)=>
    {
    	if(err)
    	{
    		 throw err;
    		 console.log("ERROR!");
    	}
    		var oldData = JSON.parse(data);
    		console.log(oldData.servers[0]);

    		var newServer = {
    			"id": newGuild.id,
    			"name": newGuild.name,
    			"prefix": ">",
    			"channels": [],
    		}

    		oldData.servers.push(newServer)
    		var newData = JSON.stringify(oldData);

    		fs.writeFile("serverinfo.json", newData, (err)=>
    		{
    			if(err)
    			{
    				throw err;
    				console.log("ERROR!");
    			}
    		});
    });
  }catch(e)
  {

  }

});

//when client leaves the server, or the server was deleted
client.on("guildDelete", (leftGuild)=>
{
  try
  {
    fs.readFile('serverinfo.json', 'utf8',(err, data)=>
    {
        var oldData = JSON.parse(data);
        console.log("deleted guild: " + oldData.servers[oldData.servers.length-1]) + "\n";
    });
  }catch (e)
  {

  }

});


//when a message is recievesd
client.on('message', msg =>
{
  try{
    console.log("message recieved from guild: "+ msg.guild.name + "\nid: " + msg.guild.id + "\n")
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  }catch(e)
  {

  }

});
