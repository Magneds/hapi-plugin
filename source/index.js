const storage = new WeakMap();

class HapiPlugin {
	constructor(options) {
		storage.set(this, { options })
	}

	get options() {
		const { options } = storage.get(this);

		return options;
	}


	get name() {
		const { name } = this.options;

		return name;
	}

	set name(value) {
		this.options.name = value;
	}


	get version() {
		const { version } = this.options;

		return version;
	}

	set version(value) {
		this.options.version = value;
	}


	get register() {
		const { register } = this.options;
		const invoke = register || function () {
			throw new Error(`HapiPlugin "${this.name}" has no register method`);
		};

		return async (server, options) => invoke(server, options);
	}

	set register(value) {
		this.options.register = value;
	}


	get dependencies() {
		return this.options.dependencies || [];
	}

	set dependencies(value) {
		this.options.dependencies = value;
	}
}

module.exports = HapiPlugin;
