const https = require("https");
const htmlToJson = require("html-to-json");
var url = "https://permanent-redirect.xyz/pages/1515693359";

function follow()
{
	https.get(url, res => {
	  res.setEncoding("utf8");
	  let body = "";
	  res.on("data", data => {
	    body += data;
	  });
	res.on("end", () => {
	  htmlToJson.parse(body, function () {
	    return this.map('a', function ($item) {
	      return $item.text();
	    });
	  }).done(function (items) {
	    console.log(items[0]);
	    url = "https://" + items[0];
	    if (items[0] == '?')
	    {
	  	  console.log(body);
	    }
	    else
	    {
	  	  follow();
	    }
	  }, function (err) {});
	});
  });
}

follow();