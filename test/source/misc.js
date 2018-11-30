const Lab = require('lab');
const { expect } = require('code');
const { experiment, test, it } = (exports.lab = Lab.script());

const HapiPlugin = require(`${__dirname}/../..`);

experiment('Miscellaneous', () => {
	test('override all dependencies', () => {
		const plugin = new HapiPlugin();
		const override = ['foo', 'bar', 'baz'];

		expect(plugin.dependencies).to.be.array();

		plugin.dependencies = override;

		expect(plugin.dependencies).to.equal(override);
	});

	test('override options', () => {
		const plugin = new HapiPlugin();

		expect(plugin.options).to.be.object();
		expect(plugin.options).to.equal({});

		plugin.options = false;

		expect(plugin.options).to.be.object();
		expect(plugin.options).to.equal({});
	});

	test('override routes', () => {
		const plugin = new HapiPlugin();

		expect(plugin.routes).to.be.object();
		expect(plugin.routes).to.equal({});

		plugin.routes = false;

		expect(plugin.routes).to.be.object();
		expect(plugin.routes).to.equal({});
	});

	test('override exports', () => {
		const register = async () => {};
		const plugin = new HapiPlugin({
			name: 'gungnir',
			version: '3.2.1',
			register
		});

		expect(plugin.exports).to.equal({
			name: 'gungnir',
			version: '3.2.1',
			dependencies: undefined,
			register
		});

		plugin.options = { foo: 'bar' };

		expect(plugin.exports).to.equal({
			plugin: {
				name: 'gungnir',
				version: '3.2.1',
				dependencies: undefined,
				register
			},
			options: { foo: 'bar' },
			routes: {}
		});

		plugin.prefix = '/prefix';

		expect(plugin.exports).to.equal({
			plugin: {
				name: 'gungnir',
				version: '3.2.1',
				dependencies: undefined,
				register
			},
			options: { foo: 'bar' },
			routes: {
				prefix: '/prefix'
			}
		});
	});
});
