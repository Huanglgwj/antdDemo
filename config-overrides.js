const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackExternals,
  addLessLoader
} = require("customize-cra");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require("path");
process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true //或者css, true代表运用less
  }),
  addLessLoader({
    lessOptions:{javascriptEnabled:true}
  }),
  // 别名
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  }),
  // 显示打包后的文件体积
  // addWebpackPlugin(
  //     new BundleAnalyzerPlugin({
  //         analyzerMode: 'static', //输出静态报告文件report.html，而不是启动一个web服务
  //     }),
  // ),
  // 替换moment.js
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  // cnd引入的不打包
  // addWebpackExternals({
  //     react: 'React',
  //     'react-dom': 'ReactDom',
  // }),
  //暴露webpack的配置
  config => {
    return config;
  }
);
