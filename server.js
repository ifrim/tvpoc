let path = require('path');
let express = require('express');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let opn = require('opn');

let app = express();
let config = require('./webpack.js');
let compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin());

app.use(express.static(path.resolve(__dirname, 'src')));

let devMiddlewareInstance = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
});
app.use(devMiddlewareInstance);

app.use(require('webpack-hot-middleware')(compiler));

devMiddlewareInstance.waitUntilValid(() => {
	const PORT = 3000;
	app.listen(PORT, function () {
		console.log(`\nApp listening on port ${PORT}!\n`);
		opn(`http://localhost:${PORT}`);
	});
});
