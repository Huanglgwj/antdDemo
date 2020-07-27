const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');
const path = require('path');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.extend.json',
            },
        },
    ],
    webpack: {},
    // devServer: {
    //     open: true,
    //     host: '127.0.0.1',
    //     port: 3030,
    //     https: false,
    //     hotOnly: false,
    //     proxy: {
    //         '/api': {
    //             target: '',
    //             changeOrigin: true,
    //             ws: true,
    //             xfwd: false,
    //             pathRewrite: {
    //                 '^/api': '',
    //             },
    //         },
    //     },
    // },
};
