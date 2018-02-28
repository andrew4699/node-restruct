class QueryManager
{
	constructor(query)
	{
		this.query = query;
	}

	getQueryData()
	{
		let select = [],
			table,
			where = {};

		table = /FROM `?([^`|^\s]+)`?/.exec(this.query)[1];
		return {table};
	}
}

module.exports = QueryManager;