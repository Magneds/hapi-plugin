# HapiPlugin

A convenience layer to easily create plugins for the Hapi ecosystem

## Installation

The HapiPlugin package is a scoped packages, which means you'll have to include the scope during installation.

```
$ npm install --save @magneds/hapi-plugin
```

## Usage

As with the installation, the scope is required to use the package as well.

```js
const HapiPlugin = require('@magneds/hapi-plugin');

const plugin = new HapiPlugin(require('./package.json'));

module.exports = plugin.export;
```

## API

The HapiPlugin module consist of getter and setter functions, so the API is mostly configurable setting properties.

### `constructor([{object}])`

A HapiPlugin instance can easily be bootstrapped using a predefined object, this will allow for quick creation aswel as provide consistency by allowing the use of your module package json for the name and/or version information.

Any value can still be overwritten.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

module.exports = plugin.exports;
```

### name

Set the name for the plugin. There are no enforced limitations, though it is probably wise to adhere to the Hapi implied standards of using names consisting of lowercase characters separated by a dash, as this helps configuring dependencies.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.name = 'my-plugin';

module.exports = plugin.exports;
```

### version

Set the version for the plugin.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.version = 'my-plugin';

module.exports = plugin.exports;
```

### register

Set the register method for the plugin. This method is what Hapi will invoke when registering your plugin. When this method is invoced, you can be certain all dependencies are already loaded and ready.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.register = async(server, options) {
	await server.route({
		method: 'GET',
		path: '/my-plugin-route',
		handler(request, h) {
			return h.response('my-plugin response');
		},
	});
};

module.exports = plugin.exports;
```

### dependencies

Declare plugin dependencies to other plugins.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.dependencies.push('my-other-plugin');

// or overwrite the dependencies entirely

plugin.dependencies = ['my-other-plugin'];

module.exports = plugin.exports;
```

### options

Configure (default) options to be provided to the plugin on registration by Hapi. Upon setting new options, the previous values are not removed but instead the new values are added to the existing ones.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.options = { foo: 'bar' };
plugin.options = { baz: 'qux' };

console.log(plugin.options); //  { foo: 'bar', baz: 'qux' }

module.exports = plugin.exports;
```

### routes

Hapi allows for specification of `vhost` and `prefix` in a `routes` settings. HapiPlugin lets you prepare either one using the `routes` property (or simply set the `vhost` and/or `prefix` property);

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.routes = { prefix: '/my-prefix' };

console.log(plugin.routes); //  { prefix: '/my-prefix' }

module.exports = plugin.exports;
```

### prefix

Specify the prefix to use for all plugin registered routes. This is a very nice way to allow for modification to the routes registered by your plugin. HapiPlugin will take care of putting the prefix into the `routes` object.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.prefix = '/my-prefix';

console.log(plugin.prefix); //  '/my-prefix'
console.log(plugin.routes); //  { prefix: '/my-prefix' }

module.exports = plugin.exports;
```

### vhost

Specify the vhost to use for all plugin registered routes. This is a convenient way to ensure the plugin routes exist only for specific vhosts.

```js
const HapiPlugin = require('@magneds/hapi-plugin');
const plugin = new HapiPlugin(require('./package.json'));

plugin.vhost = 'my-vhost.example.com';

console.log(plugin.vhost); //  'my-vhost.example.com'
console.log(plugin.routes); //  { vhost: 'my-vhost.example.com' }

module.exports = plugin.exports;
```

### exports

Exporting the plugin is one of the most important steps to successfully register a plugin to Hapi. It may be cumbersome to get right, so HapiPlugin takes care of the differences in syntax you can have in case there are routes or options involved.

### config

If there is a need/desire to modify the collected configuration, it is stored in the `config` (readonly) property. Read-only in this case prevent from overwriting the `config` property entirely, but as objects are by reference in javascript, it will allow for direct manipulation, even though we don't particularly encourage this approach.

## Change log

Please see [Changelog](CHANGELOG.md)

## Testing

```bash
$ npm test
```

## Contributing

Please see [Contributing](CONTRIBUTING.md)

## Credits

-   [All Contributors][link-contributors]

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[link-contributors]: ../../contributors
