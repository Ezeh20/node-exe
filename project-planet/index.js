const { parse } = require("csv-parse");
const fs = require("fs");
const result = [];

const isLiveable = (planet) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 &&
		planet["koi_insol"] < 1.11 &&
		planet["koi_prad"] < 1.61
	);
};

fs.createReadStream("exoplanet-nasa.csv")
	.pipe(
		parse({
			comment: "#",
			columns: true,
		})
	)
	.on("data", (data) => {
		if (isLiveable(data)) {
			result.push(data);
		}
	})
	.on("error", (error) => {
		console.log(error);
	})
	.on("end", () => {
		console.log(result.map((planet) => planet.kepler_name));
		console.log("End of stream");
	});
