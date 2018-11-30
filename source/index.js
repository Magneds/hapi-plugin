const storage = new WeakMap();

class HapiPlugin {
	constructor(config = {}) {
		storage.set(this, { config });
	}

	get config() {
		const { config } = storage.get(this);

		return config;
	}

	get name() {
		const { name } = this.config;

		return name;
	}

	set name(value) {
		this.config.name = value;
	}

	get version() {
		const { version } = this.config;

		return version;
	}

	set version(value) {
		this.config.version = value;
	}

	get register() {
		const { register } = this.config;
		const invoke = register
			? register
			: async () => {
					throw new Error(
						`HapiPlugin "${this.name}" has no register method`
					);
			  };

		return invoke;
	}

	set register(value) {
		this.config.register = value;
	}

	get dependencies() {
		return this.config.dependencies || [];
	}

	set dependencies(value) {
		this.config.dependencies = value;
	}

	get options() {
		return this.config.options || {};
	}

	set options(value) {
		this.config.options = value || {};
	}

	get routes() {
		return this.config.routes;
	}

	set routes(value) {
		this.config.routes = value;
	}

	get prefix() {
		return (this.routes || {}).prefix;
	}

	set prefix(value) {
		this.routes = Object.assign(this.routes, { prefix: value });
	}

	get export() {
		const {
			name,
			version,
			dependencies: depends,
			options,
			register,
			routes
		} = this;
		const dependencies = depends.length ? depends : undefined;

		if (routes || options) {
			return {
				plugin: { name, version, dependencies, register },
				options,
				routes
			};
		}

		return { name, version, dependencies, register };
	}
}

module.exports = HapiPlugin;
