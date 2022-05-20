const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: false,
    context: __dirname,
    entry: {
        main: path.resolve(__dirname, 'src', 'index.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                loader: 'babel-loader',
            },
        ],
    },

    plugins: [new GasPlugin(), new Es3ifyPlugin()],
};
