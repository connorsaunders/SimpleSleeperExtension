const path = require('path');

module.exports = {
  mode: 'production', // Use 'production' mode to avoid eval in source maps
  devtool: 'source-map', // Ensure source maps are properly configured
  entry: './src/contentScript.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
