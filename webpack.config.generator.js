'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pachageJSON = require('./package.json');

function getDefaultOptions() {
  var version = '0.0.1';
  if ((pachageJSON) && (pachageJSON.version)) {
    version = pachageJSON.version;
  }

  return {
    version: version,

    isHotDev: true, // default
    devHost: 'localhost',
    devPort: 3333,

    isServerRendering: true,

    noErrors: true,

    //
    needInject: true,

    // preset folders
    files: {
      outIndex: 'index.html',
      templateHtmlDev: 'src/index_dev.html',
      templateHtml: 'src/index.html',
      // output files
      bundle: 'bundle.js',
      styles: 'styles.css'
    },

    folders: {
      output: 'public',
      src: 'src',
      js: 'src/js',
      img: 'src/res/img',
      json: 'src/res/json',
      fonts: 'src/res/fonts',
      styles: 'src/res/styles'
    }
  };
}

function getEntry(options) {
  var entry = [];
  if (options.isHotDev) {
    entry.push('webpack-hot-middleware/client?reload=true?http://' + options.devHost + ':' + options.devPort);
  }
  entry.push('./' + options.folders.js + '/index.js');
  return entry;
}

function getOutput(options) {
  if (options.isHotDev) {
    return {
      path: path.join(__dirname, options.folders.output),
      publicPath: '/' + options.folders.output,
      filename: options.files.bundle
    };
  } else {
    return {
      path: path.join(__dirname, options.folders.output),
      filename: '/js/' + options.files.bundle.split('.')[0] + '.[chunkhash].js'
    };
  }
}

function processPluginsOptions(options) {
  var plugins = [];

  if (!options) return plugins;

  if (options.isHotDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
  } else {
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.DedupePlugin());

    var uglifyOptions = {
      minimize: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      },
      sourceMap: false
    };
    plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyOptions));
    plugins.push(new ExtractTextPlugin(
      '/styles/' + options.files.styles.split('.')[0] + '.[contenthash].css',
      { allChunks: true }
    ));
    plugins.push(new HtmlWebpackPlugin({
      filename: options.files.outIndex,
      template: options.files.templateHtml,
      inject: options.needInject ? options.needInject : false
    }));
  }

  var defines = {};
  if (options.isHotDev) {
    defines.process = { env: { NODE_ENV: JSON.stringify('development') } };
    defines.__CLIENT__ = false;
    defines.__DEVELOPMENT__ = false;
  } else {
    defines.process = { env: { NODE_ENV: JSON.stringify('production') } };
  }

  if (options.useReactDevTools) {
    defines.__DEVTOOLS__ = false;
  }


  if (options.isServerRendering)
  {
    defines.__CLIENT__ = false;
    defines.__SERVER__ = true;
  } else {
    defines.__CLIENT__ = true;
    defines.__SERVER__ = false;
  }
  defines.APP_VERSION = JSON.stringify(options.version);

  plugins.push(new webpack.DefinePlugin(defines));
  return plugins;
}


function getPlugins(options) {
  return processPluginsOptions(options);
}

function getLoaders(options) {
  return {

    json: {
      test: /\.json$/,
      loader: 'json',
      include: path.join(__dirname, options.folders.json)
    },

    png: {
      test: /\.png$/,
      loader: 'url?.[ext]&mimetype=image/png',
      include: path.join(__dirname, options.folders.img)
    },

    woff: {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
      include: path.join(__dirname, options.folders.fonts)
    },

    ttf_eot_svg: {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file',
      include: path.join(__dirname, options.folders.fonts)
    },

    stylus: {
      test: /\.styl$/,
      loader: 'style!css!stylus?paths=node_modules/',
      include: [
        path.join(__dirname, options.folders.styles),
      ]
    },

    css: {
      test: /\.css$/,
      loader: 'style!css',
      include: [
        path.join(__dirname, options.folders.styles),
        path.join(__dirname, 'node_modules/normalize.css')
      ]
    },

    css_postcss: {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css?minimize!postcss'),
      include: [
        path.join(__dirname, options.folders.styles),
        path.join(__dirname, 'node_modules/normalize.css')
      ]
    },

    babel_2_transform: {
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, options.folders.js),
      query: {
        stage: 2,
        optional: ['es7.classProperties'],
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

    babel_0_transform: {
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

    babel_0: {
      test: /\.jsx?$/,
      loaders: ['babel?stage=0'],
      include: path.join(__dirname, options.folders.js)
    }
  };
}

function getResolve(options) {
  console.log(__dirname);
  return {
    root: path.resolve(__dirname),
    alias: {
      // react: path.join(__dirname, "node_modules/react")
      // redux: path.join(__dirname, "node_modules/react")
      // react: 'src/js',
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
}

module.exports.getDefaultOptions = getDefaultOptions;
module.exports.getEntry = getEntry;
module.exports.getOutput = getOutput;
module.exports.getPlugins = getPlugins;
module.exports.getLoaders = getLoaders;
module.exports.getResolve = getResolve;
