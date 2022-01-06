const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
	var ippp = req.socket.remoteAddress.slice(7);
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
						var policy = `curl --location --request POST 'http://10.10.10.141/api/v2/cmdb/firewall/address?access_token=HN03NhGb4w7fhNf7w6whgr6Hg1nzQx' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "name": "${ippp}",
    "subnet": "${ippp}/32",
    "color": "0"
  }
'`;
					var result3 = runCmd(policy);
					console.log(result3);

				  var policy =	`curl --location --request PUT 'http://10.10.10.141/api/v2/cmdb/firewall/shaping-policy/2?access_token=HN03NhGb4w7fhNf7w6whgr6Hg1nzQx' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "srcaddr": [
      {
        "name": "${ippp}"
      }
    ]
  }
'`;
					var result3 = runCmd(policy);
					console.log(result3);
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
server.listen(3000);

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
