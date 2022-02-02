const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:10001/',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    port: 10001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      title: 'App',
    }),
    new ModuleFederationPlugin({
      name: 'App',
      remotes: {
        HomeApp: 'HomeApp@http://localhost:10002/remoteEntry.js',
        ContactApp: 'ContactApp@http://localhost:10003/remoteEntry.js',
        AboutApp: `promise new Promise(resolve => {
					const remoteUrlWithVersion = 'http://localhost:10004/remoteEntry.js'
					const script = document.createElement('script')
					script.src = remoteUrlWithVersion
					script.onload = () => {
						// the injected script has loaded and is available on window
						// we can now resolve this Promise
						const proxy = {
							get: (request) => window.AboutApp.get(request),
							init: (arg) => {
								try {
									return window.AboutApp.init(arg)
								} catch(e) {
									console.log('remote container already initialized')
								}
							}
						}
						resolve(proxy)
					}
					// inject this script with the src set to the versioned remoteEntry.js
					document.head.appendChild(script);
				})`,
      },
    }),
  ],
  mode: 'production',
};
