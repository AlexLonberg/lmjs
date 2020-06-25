/* webpack.config.js [ 03.06.2020 : 01:05:12 ] */

const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  // Отключаем полифиллы webpack для NodeJS
  node: false,
  mode: 'development',
  // devtool: 'source-map',
  devtool: 'none', //'source-map'
  entry: './ie11-test.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'ie11-test-compiled.js'
  },
  resolve: {
    modules: ['node_modules', '.test/ie11/node_modules']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './index.html'),
          to: path.resolve(__dirname, './dist/index.html')
        }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "usage",
                  "corejs": 3,
                  "targets": {
                    "ie": 11
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
