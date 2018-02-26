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
			let args = [orig];

			for(let i = 0; i < arguments.length; i++)
			{
				args.push(arguments[i]);
			}

			self.hooks[method].apply(null, args);
		};
	}
}

module.exports = HookManager;