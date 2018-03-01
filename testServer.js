const mysql = require("mysql");
const net = require("net");

const PORT = 3307;

let db = mysql.createConnection(
{
	host: "localhost",
	user: "root",
	password: "",
	database: "restructure",
	connectTimeout: 1000,
	port: PORT,
});

let server = net.createServer();

server.listen(PORT, '127.0.0.1', function()
{
	console.log("listening");

	db.connect(function(error)
	{
		if(error)
		{
			console.log(error);
			process.exit(0);
		}

		console.log("Connected to MySQL");
	});
});

server.on('connection', handleConnection);

function handleConnection(conn)
{
	let remoteAddress = 5;

	console.log("con");

	conn.write("6\0\0\0\05\05\02-m2\0\0\0\0\0dvH@I-CJ\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0*4d|cZwk4^]:\0");

	conn.on('data', onConnData);
	conn.once('close', onConnClose);
	conn.on('error', onConnError);

	function onConnData(d)
	{
		console.log('connection data from %s: %j', remoteAddress, d);
		conn.write(d);
	}

	function onConnClose()
	{
		console.log('connection from %s closed', remoteAddress);
	}

	function onConnError(err)
	{
		console.log('Connection %s error: %s', remoteAddress, err.message);
	}
}