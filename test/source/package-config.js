const Lab = require('lab');
const { expect } = require('code');
const { experiment, test, it } = (exports.lab = Lab.script());

const basepath = `${__dirname}/../..`;
const HapiPlugin = require(basepath);
const pkg = require(`${basepath}/package.json`);

experiment('Using package.json', () => {
	const plugin = new HapiPlugin(pkg);

	test('config reflects the package.json', () => {
		expect(plugin.config).to.be.object();

		expect(plugin.config).to.contain('name');
		expect(plugin.config.name).to.equal(pkg.name);

		expect(plugin.config).to.contain('version');
		expect(plugin.config.version).to.equal(pkg.version);

		expect(plugin.config).to.contain('description');
		expect(plugin.config.description).to.equal(pkg.description);

		expect(plugin.config).to.contain('keywords');
		expect(plugin.config.keywords).to.equal(pkg.keywords);

		expect(plugin.config).to.contain('main');
		expect(plugin.config.main).to.equal(pkg.main);

		expect(plugin.config).to.contain('license');
		expect(plugin.config.license).to.equal(pkg.license);

		expect(plugin.config).to.contain('scripts');
		expect(plugin.config.scripts).to.equal(pkg.scripts);
	});

	test(`name is "${pkg.name}"`, () => {
		expect(plugin.name).to.equal(pkg.name);
	});

	test(`version is ${pkg.version}`, () => {
		expect(plugin.version).to.equal(pkg.version);
	});

	test('register is a function throwing an error', () => {
		expect(plugin.register).to.be.function();

		plugin
			.register()
			.catch((error) =>
				expect(error.message).to.equal(
					`HapiPlugin "${pkg.name}" has no register method`
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
		expect(exported.name).to.equal(pkg.name);

		expect(exported).to.contain('version');
		expect(exported.version).to.equal(pkg.version);

		expect(exported).to.contain('dependencies');
		expect(exported.dependencies).to.be.undefined();

		expect(exported).to.contain('register');
		expect(exported.register).to.be.function([]);
	});
});
