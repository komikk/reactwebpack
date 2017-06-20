import * as express from "express";
import * as path from "path";

console.log("Start");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("Ssfdsdfsdftart");

let app = express();
let server;

// https://medium.com/@GiacomoRebonato/hot-module-reloading-with-typescript-and-react-9cc8768e8f24
if (process.env.NODE_ENV === "development") {
    console.log("developmentfff");
    let webpack = require("webpack")
    const webpackConfig = require("../webpack.config.ts")
    // 
    const compiler = webpack(webpackConfig)
    // middleware which can be mounted in an express server to serve the latest 
    // compilation of your bundle during development. This uses webpack's Node API 
    // in watch mode and instead of outputting to the file system it outputs to memory.
    // For comparison, you might use something like express.static instead of this middleware in production.
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig[0].output.publicPath
    }))
    // handles hot module replacement (HMR) requests for live module updates in the client.
    // it allows to mount it in an existing express server alongside webpack-dev-middleware.
    app.use(require("webpack-hot-middleware")(compiler))

    app.use(require('webpack-hot-server-middleware')(compiler));
}

app.set("port", process.env.PORT || 3000);

// static middleware allows to designate one or more 
// directories as containing static resources that are 
// simply to be delivered to the client without any special handling. 
// thinks like images, css, client side js files
app.use(express.static(__dirname + "/static"));








app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.htm'))
});

startServer();

function startServer() {
    server = app.listen(app.get("port"), () => {
        console.log(`Express started in ${app.get("env")} mode on http://localhost:${app.get("port")}; press Ctrl+C toterminate`);
    });
}