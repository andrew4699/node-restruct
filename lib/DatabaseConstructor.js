const PLACEHOLDER_VALUE = 5;

const handler =
{
	get: function(target, key)
	{
		if(key in target || typeof(key) === "symbol")
		{
			return target[key];
		}
		else if(target instanceof DatabaseConstructor)
		{
			target.addColumn(key);
			console.log("ATTEMPT GET", key);
			return PLACEHOLDER_VALUE;
		}
	}
};

class DatabaseConstructor
{
	constructor(connection, sendQuery, table)
	{
		this._connection = connection;
		this._sendQuery = sendQuery;
		this._rsTable = table;
		this._rsDB = connection.config.database;

		this.createTable();
		return new Proxy(this, handler);
	}

	createTable()
	{
		this._sendQuery(`CREATE TABLE IF NOT EXISTS \`${this._rsTable}\`
		(
			\`_temp\` INT(1) NULL
		)`);

		console.log(">> Creating table " + this._rsTable + "...");
	}

	addColumn(col)
	{
		let colType = "TEXT";

		let query =
		`IF NOT EXISTS(
			SELECT NULL
			FROM INFORMATION_SCHEMA.COLUMNS
			WHERE table_name = '${this._rsTable}'
			  AND table_schema = database()
			  AND column_name = '${col}'
		) THEN
		ALTER TABLE ${this._rsTable} ADD \`${col}\` ${colType} NOT NULL;
		END IF;`;

		console.log(">> Adding column " + col + " to table " + this._rsTable + "...");
		this[col] = PLACEHOLDER_VALUE;

		this._sendQuery(query, function(err)
		{
			if(err)
			{
				console.log(err);
			}
		});
	}
}

module.exports = DatabaseConstructor;