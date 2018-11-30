const storage = new WeakMap();

/**
 *  Hapi Plugin wrapper
 *
 *  @class HapiPlugin
 */
class HapiPlugin {
	/**
	 *  Creates an instance of HapiPlugin.

	 *  @param     {object} [config={}]
	 *  @memberof  HapiPlugin
	 */
	constructor(values = {}) {
		storage.set(this, { config: Object.assign({}, values) });
	}

	/**
	 *  Obtain the current configuration
	 *
	 *  @readonly
	 *  @memberof HapiPlugin
	 */
	get config() {
		const { config } = storage.get(this);

		return config;
	}

	/**
	 *  Obtain the plugin name
	 *
	 *  @memberof HapiPlugin
	 */
	get name() {
		const { name } = this.config;

		return name;
	}

	/**
	 *  Set the plugin name
	 *
	 *  @memberof HapiPlugin
	 */
	set name(value) {
		this.config.name = value;
	}

	/**
	 *  Obtain the version
	 *
	 *  @memberof HapiPlugin
	 */
	get version() {
		const { version } = this.config;

		return version;
	}

	/**
	 *  Set the version
	 *
	 *  @memberof HapiPlugin
	 */
	set version(value) {
		this.config.version = value;
	}

	/**
	 *  Obtain the register method
	 *
	 *  @memberof HapiPlugin
	 */
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

	/**
	 *  Set the register method
	 *
	 *  @memberof HapiPlugin
	 */
	set register(value) {
		this.config.register = value;
	}

	/**
	 *  Obtain the dependencies
	 *
	 *  @memberof HapiPlugin
	 */
	get dependencies() {
		return this.config.dependencies || [];
	}

	/**
	 *  Set the dependencies
	 *
	 *  @memberof HapiPlugin
	 */
	set dependencies(value) {
		this.config.dependencies = value;
	}

	/**
	 *  Obtain the options
	 *
	 *  @memberof HapiPlugin
	 */
	get options() {
		return this.config.options || {};
	}

	/**
	 *  Set the options
	 *
	 *  @memberof HapiPlugin
	 */
	set options(value) {
		this.config.options = value || {};
	}

	/**
	 *  Obtain the routes config
	 *
	 *  @memberof HapiPlugin
	 */
	get routes() {
		return this.config.routes;
	}

	/**
	 *  Set the routes config
	 *
	 *  @memberof HapiPlugin
	 */
	set routes(value) {
		this.config.routes = value;
	}

	/**
	 *  Obtain the routes.prefix value
	 *
	 *  @memberof HapiPlugin
	 */
	get prefix() {
		return (this.routes || {}).prefix;
	}

	/**
	 *  Set the routes.prefix value
	 *
	 *  @memberof HapiPlugin
	 */
	set prefix(value) {
		this.routes = Object.assign(this.routes, { prefix: value });
	}

	/**
	 *  Export the plugin configuration
	 *
	 *  @readonly
	 *  @memberof HapiPlugin
	 */
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
