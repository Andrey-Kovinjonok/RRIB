var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require('./webpack.config.dev');

var cfg = require('./webpack.config.generator.js');
var cfgPreset = cfg.getDefaultOptions();


var app = express();
var compiler = webpack(config);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  hot: config.isHotDev,
  noInfo: config.noInfo,
  inline: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(devMiddleware);

app.use(hotMiddleware);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, cfgPreset.files.templateHtmlDev));
});

app.listen(cfgPreset.devPort, cfgPreset.devHost, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://' + cfgPreset.devHost + ':' + cfgPreset.devPort);
});
