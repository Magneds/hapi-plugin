const Lab = require('lab');
const { expect } = require('code');
const { experiment, test, it } = (exports.lab = Lab.script());

const HapiPlugin = require(`${__dirname}/../..`);

experiment('Default settings (unconfigured)', () => {
	const plugin = new HapiPlugin();

	test('config is an empty object', () => {
		expect(plugin.config).to.equal({});
	});

	test('name is undefined', () => {
		expect(plugin.name).to.be.undefined();
	});

	test('version is undefined', () => {
		expect(plugin.version).to.be.undefined();
	});

	test('register is a function throwing an error', () => {
		expect(plugin.register).to.be.function();

		plugin
			.register()
			.catch((error) =>
				expect(error.message).to.equal(
					'HapiPlugin "undefined" has no register method'
				)
			);
	});

	test('dependencies is an empty array', () => {
		expect(plugin.dependencies).to.be.array();
		expect(plugin.dependencies).to.be.length(0);
	});

	test('options is an empty object', () => {
		expect(plugin.options).to.equal({});
	});

	test('routes is undefined', () => {
		expect(plugin.routes).to.equal({});
	});

	test('prefix is undefined', () => {
		expect(plugin.prefix).to.be.undefined();
	});

	test('vhost is undefined', () => {
		expect(plugin.vhost).to.be.undefined();
	});

	test('exports is an object reflecting the confguration', () => {
		const { exports } = plugin;

		expect(exports).to.be.object();

		expect(exports).to.contain('name');
		expect(exports.name).to.be.undefined();

		expect(exports).to.contain('version');
		expect(exports.version).to.be.undefined();

		expect(exports).to.contain('dependencies');
		expect(exports.dependencies).to.be.undefined();

		expect(exports).to.contain('register');
		expect(exports.register).to.be.function([]);
	});
});
