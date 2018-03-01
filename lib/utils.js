let utils =
{
	spacePrint: function(head, data)
	{
		if(typeof(data) === "undefined")
		{
			data = head;
		}

		console.log("");
		console.log("-- " + head + " --");
		console.log(data);
		console.log("");
	},
	replaceAll: function(str, search, replacement)
	{
	    return str.replace(new RegExp(search, 'g'), replacement);
	}
};

module.exports = utils;