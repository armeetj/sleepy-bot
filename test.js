var fs = require('fs');




fs.readFile('serverinfo.json',(err, data)=>
{
	if(err)
	{
		 throw err;
		 console.log("ERROR!");
	}
		var oldData = JSON.parse(data);
		console.log(oldData.servers[0]);

		var newServer = {
			"id": 586724485311234061,
			"name": "new server",
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
