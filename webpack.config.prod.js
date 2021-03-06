'use strict';


//var path = require('path');

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var cfg = require('./webpack.config.generator.js');

var opt = cfg.getDefaultOptions();

// production release
opt.isHotDev = false;
opt.noInfo = false;
opt.folders.output = 'public';
// our component's folders will contain js and styles definitions
opt.folders.styles = opt.folders.js;

var loaders = cfg.getLoaders(opt);

module.exports = {
  entry: cfg.getEntry(opt),
  output: cfg.getOutput(opt),

  plugins: cfg.getPlugins(opt),

  module: {
    loaders: [
      loaders.babel_0,
      loaders.json
    ],
    
    postcss: function () {
      return [autoprefixer({browsers: ['last 2 versions']})];
    }
  },

  resolve: cfg.getResolve(opt)
};