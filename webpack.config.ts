var path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        name: "client",
        target: 'web',
        entry: ["react-hot-loader/patch", path.join(__dirname, '/client/index.tsx'), "webpack-hot-middleware/client"],
        output: {
            filename: "bundle.js",
            path: __dirname + "/static"
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                // awesome-typescript-loader helps Webpack compile your TypeScript code using the TypeScript’s standard configuration file named tsconfig.json
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "react-hot-loader/webpack"
                        },
                        {
                            loader: "awesome-typescript-loader"
                        }
                    ]
                },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, use: "source-map-loader" }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },

        plugins: [
            // enable HMR globally
            new webpack.HotModuleReplacementPlugin()

        ],

    },
    {
        name: 'server',
        target: 'node',
        entry: path.join(__dirname, '/server/server.ts'),
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, 'dist'),
            libraryTarget: 'commonjs2'
        },
        target: 'node',
        // https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
        externals: [nodeExternals()],
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
    }];