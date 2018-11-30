const Lab = require('lab');
const { expect } = require('code');
const { experiment, test, it } = (exports.lab = Lab.script());

const HapiPlugin = require(`${__dirname}/../..`);
const configured = {
	name: 'mjolnir',
	version: '1.2.3',
	async register(server, options) {
		return 'registered';
	},
	dependencies: ['járngreipr'],
	options: { foo: 'bar', baz: 'qux' },
	routes: {
		prefix: '/prefix',
		vhost: 'my-vhost'
	}
};

experiment('Configure', () => {
	const plugin = new HapiPlugin();

	test('name value', () => {
		expect(plugin.name).to.be.undefined();
		expect(plugin.config).to.equal({});

		plugin.name = configured.name;

		expect(plugin.name).to.equal(configured.name);
		expect(plugin.config).to.equal({
			name: configured.name
		});
	});

	test('version value', () => {
		expect(plugin.version).to.be.undefined();
		expect(plugin.config).to.equal({
			name: configured.name
		});

		plugin.version = configured.version;

		expect(plugin.version).to.equal(configured.version);
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version
		});
	});

	test('register value', () => {
		expect(plugin.register).to.be.function();
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version
		});

		plugin.register = configured.register;

		expect(plugin.register).to.equal(configured.register);
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register
		});
	});

	test('dependencies value', () => {
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register
		});
		expect(plugin.dependencies).to.be.array();
		expect(plugin.dependencies).to.be.length(0);

		plugin.dependencies.push(...configured.dependencies);

		expect(plugin.dependencies).to.be.array();
		expect(plugin.dependencies).to.be.length(1);
		expect(plugin.dependencies).to.equal(configured.dependencies);
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies
		});
	});

	test('options value', () => {
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies
		});
		expect(plugin.options).to.equal({});

		plugin.options = { foo: 1 };

		expect(plugin.options).to.equal({ foo: 1 });

		plugin.options = { foo: configured.options.foo };

		expect(plugin.options).to.equal({ foo: configured.options.foo });

		plugin.options = { baz: configured.options.baz };

		expect(plugin.options).to.equal(configured.options);

		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies,
			options: configured.options
		});
	});

	test('prefix value', () => {
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies,
			options: configured.options
		});
		expect(plugin.prefix).to.be.undefined();

		plugin.prefix = configured.routes.prefix;

		expect(plugin.prefix).to.equal(configured.routes.prefix);
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies,
			options: configured.options,
			routes: { prefix: configured.routes.prefix }
		});
	});

	test('vhost value', () => {
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies,
			options: configured.options,
			routes: { prefix: configured.routes.prefix }
		});
		expect(plugin.vhost).to.be.undefined();

		plugin.vhost = configured.routes.vhost;

		expect(plugin.prefix).to.equal(configured.routes.prefix);
		expect(plugin.config).to.equal({
			name: configured.name,
			version: configured.version,
			register: configured.register,
			dependencies: configured.dependencies,
			options: configured.options,
			routes: configured.routes
		});
	});

	test('exports value', () => {
		expect(plugin.exports).to.equal({
			plugin: {
				name: configured.name,
				version: configured.version,
				dependencies: configured.dependencies,
				register: configured.register
			},
			options: configured.options,
			routes: configured.routes
		});
	});
});
