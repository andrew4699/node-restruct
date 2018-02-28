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
	}
};

module.exports = utils;