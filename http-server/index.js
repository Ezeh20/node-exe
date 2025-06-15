const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friendList = [
	{
		id: 0,
		name: "Ezeh Chijioke",
		occupation: "Developer",
	},
	{
		id: 1,
		name: "Ezeh Somto",
		occupation: "Developer",
	},
	{
		id: 2,
		name: "Ezeh Nnamdi",
		occupation: "Developer",
	},
];

server.on("request", (req, res) => {
	const items = req.url.split("/");

	if (req.method === "POST" && items[1] === "friends") {
		res.statusCode = 201;
		res.setHeader("Content-Type", "application/json");

		req.on("data", (data) => {
			const friend = data.toString();
			console.log(friend);
			friendList.push(JSON.parse(friend));
		});
		req.pipe(res);
	} else if (items[1] === "friends") {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");

		if (items.length === 3) {
			const id = +items[2];
			res.end(JSON.stringify(friendList[id]));
		} else {
			res.end(JSON.stringify(friendList));
		}
	} else if (req.method === "GET" && items[1] === "message") {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");

		res.write("<html>");
		res.write("<body>");
		res.write('<div style={{"color":"red"}}>');
		res.write("<ul>");
		res.write("<li>This is nasa</li>");
		res.write("<li>Is this chijioke?</li>");
		res.write("</ul>");
		res.write("</div>");
		res.write("</body>");
		res.write("</html>");
		res.end();
	} else {
		res.statusCode = 404;
		res.statusMessage = "Come on man!";
	}
});

server.listen(PORT, () => {
	console.log(`Listtening to port ${PORT}`);
});
