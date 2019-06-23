var fs = require('fs');

// fs.readFile('serverinfo.json', 'utf8',(err, data)=>
//     {
//         var oldData = JSON.parse(data);
// 		oldData.servers[0].id = "-1";
//         // delete oldData.servers[0];
//         var newData = JSON.stringify(oldData);

//         fs.writeFile("serverinfo.json", newData, (err)=>
//     		{
//     			if(err)
//     			{
//             console.log("ERROR!");
//     				throw err;
//     			}
//     		});
//     });

	fs.readFile('serverinfo.json','utf8',(err, data)=>
    {
    	if(err)
    	{
        console.log("ERROR!");
    		throw err;
    		
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
            console.log("ERROR!");
    				throw err;
    			}
        });