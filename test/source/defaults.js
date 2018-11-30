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

	test('export is an object reflecting the confguration', () => {
		const { export: exported } = plugin;

		expect(exported).to.be.object();

		expect(exported).to.contain('name');
		expect(exported.name).to.be.undefined();

		expect(exported).to.contain('version');
		expect(exported.version).to.be.undefined();

		expect(exported).to.contain('dependencies');
		expect(exported.dependencies).to.be.undefined();

		expect(exported).to.contain('register');
		expect(exported.register).to.be.function([]);
	});
});
