let path = require('path');
let webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: {
		'app': [
			'webpack-hot-middleware/client?path=/__webpack_hmr',
			'./src/index.js'
		]
	},
	watchOptions: {
		ignored: /node_modules/
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'src/'),
		publicPath: 'http://localhost:3000/'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: [
					'babel-loader',
				]
			},
			{
				test: /\.scss$/,
				loader: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   name: 'assets/images/[name].[ext]',
            // }
          }
        ]
      }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};