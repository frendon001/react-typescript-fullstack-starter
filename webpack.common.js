const path = require('path');

module.exports = {
	entry: {
		main: './src/renderers/dom.tsx',
	},
	output: {
		// publicPath specifies the public URL of the output directory when referenced in a browser
		// Without this, webpack dev server could not locate the bundles when loading the app on a nested entrypoint
		publicPath: '/',
		filename: '[name].[hash].bundle.js',
		path: path.join(__dirname, 'dist'),
	},
	resolve: {
		modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
			{
				test: /\.module\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localsConvention: 'camelCaseOnly',
						},
					},
				],
			},
			{
				// Include ts, tsx, js, and jsx files.
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
				use: 'file-loader',
			},
		],
	},
};