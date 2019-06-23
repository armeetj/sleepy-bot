//Armeet Singh Jatyani 2019

const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');

var serverInfo = '';
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
    updateServerInfoObject();
});


//when bot is online, log to console
client.on('ready', () =>
{
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

    //set the presence
    client.user.setActivity("sleeping in  " + keyArray.length + " servers..."); 

});


//when client joins a new server
client.on("guildCreate", (newGuild)=>
{
  var newServer = {
    "id": newGuild.id,
    "name": newGuild.name,
    "prefix": ">",
    "channels": [],
  }

  serverInfo.servers.push(newServer);
  
  var newData = JSON.stringify(serverInfo);

  fs.writeFile("serverinfo.json", newData, (err)=>
  {
    if(err)
    {
      console.log("ERROR!");
      throw err;
    }
  });
  console.log("added server: " + newGuild.name + ", ID: " + newGuild.id);

});

//when client leaves the server, or the server was deleted
client.on("guildDelete", (leftGuild)=>
{
  serverInfo.servers.splice(findServerInfoIndex(leftGuild.id), 1);

  var newData = JSON.stringify(serverInfo);

  fs.writeFile("serverinfo.json", newData, (err)=>
  {
    if(err)
    {
      console.log("ERROR!");
      throw err;
    }
  });

  console.log("deleted server: " + leftGuild.name + ", ID: " + leftGuild.id);

});


//when a message is recieved
client.on('message', msg =>
{
  try{
    console.log("message recieved from guild: "+ msg.guild.name + "\nid: " + msg.guild.id)
    
    var serverPrefix = serverInfo.servers[findServerInfoIndex(msg.guild.id)].prefix;
    var input = msg.content.split(" ");
    console.log("serverPrefix: " + serverPrefix + "\n");
  
    if(msg.content === (serverPrefix + "ping"))
    {
      msg.reply('Pong!');
    }else if(input[0] + " " + input[1] === (serverPrefix + "set prefix"))
    {
      var input = msg.content.split(" ");
      if(input.length < 2)
      {
        msg.reply("Please type " + serverPrefix + "set prefix {new prefix here}");
      }else{
        serverInfo.servers[findServerInfoIndex(msg.guild.id)].prefix = input[2];
        updateServerInfoJSON();
      }
    }
  }catch(e)
  {

  }

});

//given the guild id, returns the index in where in serverinfo.json
//... that the serverinfo is located
function findServerInfoIndex(guildID)
{
  for(i = 0; i < serverInfo.servers.length; i++)
  {
    if (guildID === serverInfo.servers[i].id)
    {
      return i;
    }
  }
}

//updates the serverInfo variable by reading serverinfo.json
function updateServerInfoObject ()
{
  fs.readFile('serverinfo.json', 'utf8', (err, data) => 
  {
    serverInfo = JSON.parse(data);
  })
}

//writes to the JSON file
function updateServerInfoJSON ()
{
  fs.writeFile("serverinfo.json", JSON.stringify(serverInfo), (err)=>
  {
    if(err)
    {
      console.log("ERROR!");
      throw err;
    }
  });
}