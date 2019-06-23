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

	
    		fs.writeFile("serverinfo.json", newData, (err)=>
    		{
    			if(err)
    			{
            console.log("ERROR!");
    				throw err;
    			}
			})