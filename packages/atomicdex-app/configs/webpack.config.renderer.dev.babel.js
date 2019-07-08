/* eslint global-require: off, import/no-dynamic-require: off */

/**
 * Build config for development electron renderer process that uses
 * Hot-Module-Replacement
 *
 * https://webpack.js.org/concepts/hot-module-replacement/
 */

import path from 'path';
// import fs from 'fs';
import webpack from 'webpack';
// import chalk from 'chalk';
import merge from 'webpack-merge';
// import { spawn, execSync } from 'child_process';
import { spawn } from 'child_process';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv';

CheckNodeEnv('development');

// const pkg = require('../package.json');

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;
// const dll = path.join(__dirname, '..', 'dll');
// const manifest = path.resolve(dll, 'renderer.json');
// const requiredByDLLConfig = module.parent.filename.includes(
//   'webpack.config.renderer.dev.dll'
// );

/**
 * Warn if the DLL is not built
 */
// if (!requiredByDLLConfig && !(fs.existsSync(dll) && fs.existsSync(manifest))) {
//   console.log(
//     chalk.black.bgYellow.bold(
//       'The DLL files are missing. Sit back while we build them for you with "yarn build-dll"'
//     )
//   );
//   execSync('yarn build-dll');
// }

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-source-map',
  // devtool: 'eval-source-map',
  // performance: {
  //   hints: false,
  // },

  mode: 'development',

  // target: 'electron-renderer',
  target: 'web', // Make web variables accessible to webpack, e.g. window

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    require.resolve('../app/index')
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`,
    filename: 'renderer.dev.js'
    // libraryTarget: null
    // libraryTarget: undefined
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false
          }
        }
      },
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      },
      // SASS support - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // SASS support - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },

  plugins: [
    // requiredByDLLConfig
    //   ? null
    //   : new webpack.DllReferencePlugin({
    //       context: path.join(__dirname, '..', 'dll'),
    //       manifest: require(manifest),
    //       sourceType: 'var'
    //       // sourceType: 'umd'
    //     }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(/* {
      multiStep: true
    } */),

    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with
     * 'staging', for example, by changing the ENV variables in the npm scripts
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: process.env.DEBUG
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      utils: path.join(__dirname, '..', 'app', 'utils')
    }
  },

  // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js#L664
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    __dirname: false,
    __filename: false,
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    // https://github.com/webpack/webpack-dev-server/issues/1604#issuecomment-449465737
    disableHostCheck: true,
    // NOTE: un comment this if you don't want to refresh the page
    // hotOnly: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting Main Process...');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  }
});
