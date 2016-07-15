var path = require('path');
var webpack = require('webpack');
var ignoreFiles = new webpack.IgnorePlugin(/jquery/);
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
	entry: {
		page1:['./src/component/attendance'],
		page2: ['./src/component/staff_manage'],
		page3: ['./src/component/data-chart']
		// vendor:["./src/js/datepicker.js","./src/js/common-method.js"]
		// vendor: ["jquery"]
	},
	output: {
		path: path.join(__dirname,"dist"),
		filename: '[name].js',
		publicPath: '/rack-assets/image/'
	},
	plugins: [
		// ignoreFiles,
		new webpack.ProvidePlugin({
			React:'react',
			ReactDOM: 'react-dom'
		}),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
		// new CommonsChunkPlugin('init.js'),
		// new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'common.js',["vendor"])
	],
	resolve:{
		alias:{
			jquery: path.join(__dirname,"src/js/jquery-2.1.0.js")
		}
	},
	externals: {
		// "datepicker": './src/js/datepicker'
		// react: "window.React",
		jquery: 'window.$'
	},
	module: {
		loaders:[{
			test: /\.css$/,
			loaders: ['style','css']
		},{
				test: /\.(png|jpg)$/,
        loaders: ["url-loader?limit=8192"]
		},{
				test: /\.jsx?$/,
				exclude: [/(node_modules|bower_components)/],
				loader: "babel",
				query: {
          presets: ['react', 'es2015']
        }
		}]
	}
};
