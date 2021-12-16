const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const srcPath = resolveApp("src");

module.exports = {
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|otf|svg|jpg)$/,
                loader: "file-loader",
                options: { context: "../src" }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "resolve-url-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader?sourceMap"]
            }
        ]
    }
};
