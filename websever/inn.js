const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
	var ippp = req.socket.remoteAddress.slice(7);
		console.log(ippp);
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
						var child_process = require('child_process');

						function runCmd(cmd)
						{
						  var resp = child_process.execSync(cmd);
						  var result2 = resp.toString('UTF8');
						  return result2;
						}
						var policy = `curl --location --request POST 'http://10.11.0.42/api/v2/cmdb/firewall/address?access_token=04qQnnffGtjg86xpgh9rrHf5s6wz3t' \
						--header 'Content-Type: text/plain' \
						--data-raw '{
    "name": "${ippp}",
    "subnet": "${ippp}/32",
    "color": "0"
  }
'`;
					var result3 = runCmd(policy);
					console.log(result3);

					var getpolicyId2 = `curl --location --request GET 'http://10.11.0.42/api/v2/cmdb/firewall/shaping-policy/2?access_token=04qQnnffGtjg86xpgh9rrHf5s6wz3t' \
--data-raw ''`
					var policyId2result = runCmd(getpolicyId2);
					const polinfo = JSON.parse(policyId2result);
					for(var i = 0 ; i<polinfo.results[0].srcaddr.length;i++)
					  delete polinfo.results[0].srcaddr[i].q_origin_key;
					polinfo.results[0].srcaddr.push({"name": `${ippp}`})
					var postrg = JSON.stringify(polinfo.results[0].srcaddr);
				  var policy =	`curl --location --request PUT 'http://10.11.0.42/api/v2/cmdb/firewall/shaping-policy/2?access_token=04qQnnffGtjg86xpgh9rrHf5s6wz3t' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "srcaddr": ${postrg}
  }
'`;

					var result3 = runCmd(policy);
					var timestamp = new Date().getTime();
					console.log(result3);
					const reportok = JSON.parse(result3);
					if(reportok.http_status==200){
						res.end(`Now U get net 2MB`);
						const fs = require('fs');
						var rdata;

						fs.readFile("Output.txt",'utf8', (err, data) => {
							if (err) throw err;
							const readresult = JSON.parse(data);console.log(readresult);
							readresult.Id.push({"name": `${ippp}`,"timeout":`${timestamp}`});
							console.log(readresult);
							var readtorite = JSON.stringify(readresult);console.log(readtorite);
							fs.writeFile('Output.txt', readtorite, (err) => {
	    				if (err) throw err;
						})
						});
					//	console.log(readresult);
					/*	const readresult = JSON.parse(rdata);
						readresult.Id.push({"name": `${ippp}`,"timeout":`${timestamp}`})
						var readtorite = JSON.stringify(readresult);
						fs.writeFile('Output.txt', readtorite, (err) => {
    				if (err) throw err;
					})*/
					}


				});
    }
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">

                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(3001);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
