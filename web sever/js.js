var js = `{
    "http_method": "GET",
    "revision": "509a31954d47ba106977e49b1c83cad0",
    "results": [
        {
            "id": 2,
            "q_origin_key": 2,
            "name": "2mp",
            "comment": "",
            "status": "enable",
            "ip-version": "4",
            "srcaddr": [
                {
                    "name": "10.11.1.12",
                    "q_origin_key": "10.11.1.12"
                },
                {
                    "name": "10.11.1.11",
                    "q_origin_key": "10.11.1.11"
                }
            ],
            "dstaddr": [
                {
                    "name": "all",
                    "q_origin_key": "all"
                }
            ],
            "srcaddr6": [],
            "dstaddr6": [],
            "internet-service": "disable",
            "internet-service-name": [],
            "internet-service-group": [],
            "internet-service-custom": [],
            "internet-service-custom-group": [],
            "internet-service-src": "disable",
            "internet-service-src-name": [],
            "internet-service-src-group": [],
            "internet-service-src-custom": [],
            "internet-service-src-custom-group": [],
            "service": [
                {
                    "name": "ALL",
                    "q_origin_key": "ALL"
                }
            ],
            "schedule": "",
            "users": [],
            "groups": [],
            "application": [],
            "app-category": [],
            "app-group": [],
            "url-category": [],
            "srcintf": [],
            "dstintf": [
                {
                    "name": "port1",
                    "q_origin_key": "port1"
                }
            ],
            "tos": "0x00",
            "tos-mask": "0x00",
            "tos-negate": "disable",
            "traffic-shaper": "",
            "traffic-shaper-reverse": "",
            "per-ip-shaper": "2mp",
            "class-id": 0,
            "diffserv-forward": "disable",
            "diffserv-reverse": "disable",
            "diffservcode-forward": "000000",
            "diffservcode-rev": "000000"
        }
    ],
    "vdom": "root",
    "path": "firewall",
    "name": "shaping-policy",
    "mkey": "2",
    "status": "success",
    "http_status": 200,
    "serial": "FGVMEVVSKMQJL1CC",
    "version": "v7.0.3",
    "build": 237
}`

const ok = JSON.parse(js);

console.log(ok.results[0].srcaddr);
var  arr =[] ;

for(var i=0;i<ok.results[0].srcaddr.length;i++){
  arr.push(ok.results[0].srcaddr[i].name);
}
console.log(arr);
