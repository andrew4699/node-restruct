let hooks =
{
	query: function(orig, sql, values, cb)
	{
		console.log(arguments);
	}
};

module.exports = hooks;