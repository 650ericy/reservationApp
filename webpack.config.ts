const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'src', 'index.tsx'),  // Changed to .tsx if it's a TypeScript file

  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        // Updated test to include .ts and .tsx files
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Ensure @babel/preset-typescript is included
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
    ]
  },

  // Updated resolve.extensions to include .ts and .tsx
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'src', 'index.html')
    })
  ],
};