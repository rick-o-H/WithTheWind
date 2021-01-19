/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);
const port = 3001;

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, () => {
  console.log(`With-The-Wind dev server is up and running at http://localhost:${port}`);
});
