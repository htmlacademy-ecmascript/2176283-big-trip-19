const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Указываем путь до входной точки
  // Описываем, куда следует поместить результат работы:
  output: {
    path: path.resolve(__dirname, 'build'), // Путь до директории (важно использовать path.resolve)
    filename: 'bundle.js', // Имя файла со сборкой
    clean: true, //Очистка директории для сборки перед новой сборкой
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  // В этом массиве будут перечислены все применяемые лоадеры:
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

