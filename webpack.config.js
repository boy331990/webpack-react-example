// webpack.config.js

/**
 * html-webpack-plugin는 html관련 plugin입니다. 템플릿을 지정하거나 favicon을 설정할 수 있습니다.
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

/**
 * 1 : 현재 모드를 개발 환경으로 설정합니다.
 * 2 : 웹팩의 중요한 개념 중 첫 번째인 entry입니다. 애플리케이션 진입점을 나타냅니다.
 * 3 : 두 번째 개념 output입니다. 번들 된 파일을 저장할 경로를 나타냅니다.
 * 4 : 번들 된 파일의 이름을 나타냅니다. [hash] 는 애플리케이션이 컴파일 될 때 웹팩에서 생성된 해시를 사용합니다.
 * 5 : resolve.extensions를 설정함으로서 사용자가 import 할 때 확장자를 생략 할 수 있도록 합니다.
 * 6 : es6 바벨 관련 loader입니다. .js와 함께 .jsx 확장자도 같이 번들합니다.
 *     node_modules안에 있는 파일은 번들에 제외합니다.
 * 7 : html loader입니다. minimize: true 는 코드 최적화를 하는 옵션입니다.
 * 8 : template: 'public/index.html'로 public/index.html를 템플릿으로 지정합니다.
 * 9 : host는 개발 서버의 url입니다. port는 기본값으로 3000번 포트를 사용합니다.
 *     open은 서버가 실행 될 때 브라우저를 자동으로 열어줄지 결정합니다.
 */
module.exports = {
  // 개발 환경
  mode: "development", // 1

  // 애플리케이션 시작 경로
  entry: "./src/index.jsx", // 2

  // 번들 된 파일 경로
  output: {
    // 3
    filename: "bundle.[hash].js", // 4
  },
  resolve: {
    // 5
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        // 6
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // 7
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // 8
    }),
  ],

  // 개발 서버 설정
  devServer: {
    // 9
    host: "localhost",
    port: port,
    open: true,
  },
};
