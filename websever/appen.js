var a = `{
    "srcaddr": [
      {
        "name": "10.11.11.11"
      }
    ]
  }`
var as = "1.1.1.1"

var a = JSON.parse(a)
a.srcaddr.push({"name": `${as}`})
a.srcaddr.push({"name": `${as}`})
a.srcaddr.push({"name": `${as}`})
a.srcaddr.push({"name": `${as}`})
console.log(a.srcaddr);

var timestamp = new Date().getTime();
    console.log(timestamp);


try {
  console.log(a.srcaddr[0].num);

} catch (e) {
  console.log("ok");
}
