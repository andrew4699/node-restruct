class HookManager
{
	constructor(target, hooks)
	{
		this.target = target;
		this.hooks = hooks;
	}

	hook(method)
	{
		let orig = this.target[method], self = this;

		this.target[method] = function()
		{
			//let args = [orig.bind(self.target)];
			let args = [];

			for(let i = 0; i < arguments.length; i++)
			{
				args.push(arguments[i]);
			}

			args.push(self.target);
			args.push(orig.bind(self.target));

			self.hooks[method].apply(null, args);
		};
	}
}

module.exports = HookManager;