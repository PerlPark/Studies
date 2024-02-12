class ModifyFilePlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync('ModifyFilePlugin', (compilation, callback) => {
			const fileName = 'bundle.js';
			const asset = compilation.assets[fileName];

			if (asset) {
				const modifiedAsset = asset.source().replace('Loading...', 'Welcome!');
				compilation.assets[fileName] = {
					source: () => modifiedAsset,
					size: () => modifiedAsset.length,
				}
			}

			callback();
		});
	}
}

module.exports = ModifyFilePlugin;