const path = require('path');

module.exports = {
    entry: {
        tictactoe: './src/tictactoe/index.js',
        blackjack: './src/blackjack/index.js',
        mastermind: './src/mastermind/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'static')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
