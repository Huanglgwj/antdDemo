const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackExternals,
  addLessLoader,
  overrideDevServer,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');
// 是否生产环境
const production = process.env.NODE_ENV === 'production';
// 生产环境取消sourcemap
production ? (process.env.GENERATE_SOURCEMAP = 'false') : '';
// devServer设置
const addProxy = () => (configFunction) => {
  configFunction.host = '127.0.0.1';
  configFunction.port = 3000;
  configFunction.hotOnly = false;
  configFunction.proxy = {
      '/api': {
          target: 'http://url',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
      },
  };
  return configFunction;
};
module.exports = {
  webpack: override(
      // 模块化导入
      fixBabelImports('import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
      }),
      // less配置
      addLessLoader({
          lessOptions: { javascriptEnabled: true },
      }),
      // 别名
      addWebpackAlias({
          '@': path.resolve(__dirname, 'src'),
      }),
      // 生产环境显示打包后的文件体积
      production
          ? addWebpackPlugin(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static', //输出静态报告文件report.html，而不是启动一个web服务
                }),
            )
          : '',
      // 替换moment.js
      addWebpackPlugin(new AntdDayjsWebpackPlugin()),
      // cnd引入的不打包
      // addWebpackExternals({
      //     react: 'React',
      //     'react-dom': 'ReactDom',
      // }),
      //暴露webpack的配置
      (config) => {
          // 抽离公共代码
          config.optimization.splitChunks = {
              chunks: 'all',
              name: 'vender',
              cacheGroups: {
                  vender: {
                      name: 'vendor',
                      test: /[\\/]node_modules[\\/]/,
                      chunks: 'all',
                      priority: 10,
                      enforce: true,
                  },
                  react: {
                      name: 'react',
                      test: (module) => /react|redux/.test(module.context),
                      chunks: 'initial',
                      priority: 11,
                      enforce: true,
                  },
                  antd: {
                      name: 'antd',
                      test: (module) => {
                          return /ant/.test(module.context);
                      },
                      chunks: 'initial',
                      priority: 11,
                      enforce: true,
                  },
              },
          };
          return config;
      },
  ),
  devServer: overrideDevServer(addProxy()),
};
