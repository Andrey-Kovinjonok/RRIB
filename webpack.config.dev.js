'use strict';


//var path = require('path');

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var cfg = require('./webpack.config.generator.js');

var options = cfg.getDefaultOptions();

// we will use hot reload (HotModuleReplacementPlugin)
options.isHotDev = true;
options.useReactDevTools = true;
options.noInfo = false;
options.folders.output = 'public_dev';
// our component's folders will contain js and styles definitions
options.folders.styles = options.folders.js;

var loaders = cfg.getLoaders(opt);

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true?http://' + options.devHost + ':' + options.devPort,
    './' + options.folders.js + '/index.js'
  ],
  output: {
    path: path.join(__dirname, options.folders.output),
    publicPath: '/' + options.folders.output,
    filename: options.files.bundle
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(
      process: { env: { NODE_ENV: JSON.stringify('development') } },
      __CLIENT__: false,
      __DEVELOPMENT__: false,
      __APP_VERSION__: JSON.stringify(options.version);
    )
  ],

  module: {
    loaders: [

      {
        test: /\.json$/,
        loader: 'json',
        include: path.join(__dirname, options.folders.json)
      },

      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, options.folders.js),
        query: {
          stage: 0,

          // optional: ['es7.classProperties'],
          loose: 'all',
          plugins: ['react-transform'],
          extra: {
            'react-transform': {
              'transforms': [
                {
                  'transform': 'react-transform-hmr',
                  'imports': ['react'],
                  'locals': ['module']
                }, {
                  'transform': 'react-transform-catch-errors',
                  'imports': ['react', 'redbox-react']
                }
              ]
            }
          }
        }
      },
    ],

    postcss: function() {
      return [autoprefixer({browsers: ['last 2 versions']})];
    }
  },

  resolve: {
    root: path.resolve(__dirname),
    alias: {
      // react: path.join(__dirname, "node_modules/react")
      // redux: path.join(__dirname, "node_modules/react")
      // react: 'src/js',
      utils: path.join(options.folders.js, '/utils'),
      //muiPreset: path.join(options.folders.js, '/muiPreset'),
      staticData: path.join(options.folders.js, '/staticData'),
      store: path.join(options.folders.js, '/store'),
      api: path.join(options.folders.js, '/api'),
      controls: path.join(options.folders.js, '/controls'),
      components: path.join(options.folders.js, '/components'),
      containers: path.join(options.folders.js, '/containers'),
      // styles: path.join(options.folders.js, '/styles')
    },

    modulesDirectories: [
      options.folders.js,
      'node_modules',
      // 'web_module'
    ],

    // extensions: ['', '.json', '.js', '.jsx']
    extensions: ['', '.json', '.js'],
    /*
    node:    {
      __dirname: true,
      fs:        'empty'
    }
    */
  };
};
