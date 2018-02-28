const QueryManager = require("./QueryManager");
const DatabaseConstructor = require("./DatabaseConstructor");

let hooks =
{
	query: function(query, values, cb, connection, sendQuery)
	{
		if(typeof(sendQuery) === "undefined")
		{
			sendQuery = connection;
			connection = cb;
			cb = values;
		}

		console.log(query);

		let queryMan = new QueryManager(query);
		let queryData = queryMan.getQueryData();

		let dbConstructor = new DatabaseConstructor(connection, sendQuery, queryData.table);
		cb(null, dbConstructor, null);
		//orig(query, values, cb);
	}
};

module.exports = hooks;