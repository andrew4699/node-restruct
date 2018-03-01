const mysql = require("mysql");
const restruct = require("./lib/restruct");
const {spacePrint} = require("./lib/utils");

let db = mysql.createConnection(
{
	host: "localhost",
	user: "root",
	password: "",
	database: "restructure",
	connectTimeout: 1000,
});

restruct(db);

db.connect(function(error)
{
	if(error)
	{
		console.log(error);
		process.exit(0);
	}

	console.log("Connected to MySQL");
});

db.query("SELECT `name`, `boop`, `banana` FROM `users` WHERE `id` = '5'", function(error, results, fields)
{
	if(error)
	{
		console.log(error);
		return;
	}

	// HANDLE error AND fields
	spacePrint("response", results.abc);

	console.log(results.THIS_FUCKING_COLUMN);
});