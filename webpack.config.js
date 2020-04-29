const TerserPlugin = require('terser-webpack-plugin');
const { join } = require('path');

const baseConfig = {
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              failOnWarning: false,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 5,
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
  externals: {
    lodash: 'lodash',
    react: 'react',
    'react-dom': 'react-dom',
  },
  output: {
    library: 'react-translator',
  },
};

const umdBuild = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    path: join(__dirname, 'umd'),
    libraryTarget: 'umd',
  },
};

const cjsBuild = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    path: join(__dirname, 'cjs'),
    libraryTarget: 'commonjs2',
  },
};

module.exports = [umdBuild, cjsBuild];
