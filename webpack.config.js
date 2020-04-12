require("dotenv").config();

var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var S3Plugin = require("webpack-s3-plugin");

module.exports = (env, { mode }) => {
  const conf = {
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "femtogram",
        filename: "index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /.\.scss$/,
          exclude: /\/node_modules\//,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /.\.js$/,
          exclude: /\/node_modules\//,
          use: ["babel-loader"],
        },
      ],
    },
    optimization: {
      splitChunks: {
        name: "vendor",
        chunks: "initial",
      },
    },
  };

  // settings
  if (mode == "production" || mode=="development") {
    conf.plugins.push(
      new S3Plugin({
        include: /.*\.(html|js)/,
        s3Options: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: "ap-northeast-1",
        },
        s3UploadOptions: { Bucket: "femtogram" },
      })
    );
  } else {
    conf.devServer = {
      public: "ec2-13-113-217-149.ap-northeast-1.compute.amazonaws.com",
      host: "0.0.0.0",
      port: "8080",
    };
    conf.devtool = "inline-source-map";
  }

  return conf;
};
