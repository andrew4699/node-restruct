const utils = require("./utils");
const HookManager = require("./HookManager");
const hooks = require("./hooks");

let restruct = function(connection)
{
	let hookMan = new HookManager(connection, hooks);
	let fns = ["query"];

	for(let i = 0; i < fns.length; i++)
	{
		hookMan.hook(fns[i]);
	}

	//return connection;
};

module.exports = restruct;