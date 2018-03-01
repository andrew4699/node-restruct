const DatabaseConstructor = require("./DatabaseConstructor");
const {parse} = require("node-sqlparser");
const {replaceAll} = require("./utils");

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

		let bQuery = replaceAll(query, "`", "");
		let queryData = parse(bQuery);

		let table = queryData.from[0].table;
		let dbConstructor = new DatabaseConstructor(connection, sendQuery, table);

		for(let i = 0; i < queryData.columns.length; i++)
		{
			dbConstructor.addColumn(queryData.columns[i].expr.column);
		}

		cb(null, dbConstructor, null);
		//orig(query, values, cb);
	}
};

module.exports = hooks;