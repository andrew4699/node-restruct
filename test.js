const mysql = require("mysql");
const restruct = require("./lib/restruct");

let db = mysql.createConnection(
{
	host: "localhost",
	user: "root",
	password: "",
	database: "restructure",
	connectTimeout: 1000,
});

db = restruct(db);

db.connect(function(error)
{
	if(error)
	{
		console.log(error);
		process.exit(0);
	}

	console.log("Connected to MySQL");
});
//return;
db.query("SELECT `name` FROM `users` WHERE `id` = '5'", function(error, results, fields)
{
	console.log(arguments);
});