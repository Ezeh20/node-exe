const { get } = require("axios");

get("https://www.google.com").then((response) => {
	console.log(response);
});
