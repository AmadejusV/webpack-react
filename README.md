# webpack-react

Initial commit:

    Create package.json no questions asked: npm init -Y

    Install webpack functionality: npm i -D webpack webpack-cli webpack-dev-server

    Create .gitignore add node_modules to it

    |*Can remove: name, version, description, main, repository, keywords, author, lisence, bugs, homepage from package.json*|

    Add scripts in package.json: 
        "start": "webpack serve", 
        "watch": "webpack --watch", 
        "build": "webpack",

    For the repo not to be published above scripts add: "private": true,

    Check if webpack builds it: npm run build node dist/main.js

    Add dist folder to .gitignore because it needs to be a clean slate output, must be reapeatable every time and when on the server we don't want to host those files, we want to build them fresh every time.

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Initial webpack config commit:

    Create index.html in dist with script source to main.js

    Create webpack.config.js in root:

    module.exports = {
    mode: "development",
    devServer: {
        static: "./dist"
    }
    }

    mode sets development mode rather then production 

    static sets path for where all your stuff is when served, in this case "./dist" 

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Babel, modes, source map commit:

    Install babel: npm i -D babel-loader @babel/core @babel/preset-env

    In webpack.config.js add:

        module: { 
            rules: [ 
                { 
                    test: /.js$/, 
                    exclude: /node_modules/, 
                    use: { loader: "babel-loader", },
                },
            ], 
        },

    Create babel.config.js in root and in it add:

        module.exports = { 
            presets: ["@babel/preset-env"], 
        };

    And recompile with babel:

        npm run build

    ADD Source-maps:

        in webpack.config.js 
        change devtool to: devtool: "source-map"
        lets you see original source files in devtools
        e.x. index.js

    Refactor scripts:

        install cross-env for easier script usage on linux/windows npm i -D cross-env

        in package.json: "build": "cross-env NODE_ENV=production webpack", "build-dev": "webpack"

        in webpack.config.js set a dynamic mode pick between development and production and set mode: mode:

        let mode = "development"

        if(process.env.NODE_ENV==="production"){ mode="production"; }

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

css, scss, postcss, hot reloading commit:

Add styles/index.css in src.
    In index.js import index.css import "./styles/index.css";

Install css loader and plugin: 
    npm i -D css-loader mini-css-extract-plugin

In webpack.config.js add:
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

In rules add: 
    { 
        test: /.css$/i, 
        use: [MiniCssExtractPlugin.loader, "css-loader"], 
    },

In webpack everything reads from right to left in arrays so in this case it's gonna use css-loader to process it, then it's gonna get piped into miniCssExtractplugin, and then it's gonna get spit out to our css folder.

    mini-css-extract-plugin instead of style-loader 
    difference: style-loader injects the styles into your js bundle, 
    mini css plugin creates resources for a single final css file

In module exports add: 
    plugins: [new MiniCssExtractPlugin()],

Now in dist/index.html add link to css
    <link rel="stylesheet" href="main.css">

In webpack in devServer add: 
    hot: true,

For hot reloading, no need to write --hot near scripts. It's faster and you don't need to replicate your state in browser since it doesn't reload, makes looking up changes faster, and when you need a reload, you reload and it scales, when the project get's bigger it will show that hot reloading is much faster.


In styles create _global.scss and rename index.css extension to index.scss

Transfer style code to _global.scss if theres any

In index.scss change code to: @use "global";

In styles create _variables.scss in it add: 
    :root { --text:black; } 
    $bg: rgb(240, 138, 138);

In _global.scss add:
    @use "variables"; 
    body { 
        margin: 0; 
        background-color: variables.$bg; 
        color: var(--text); 
        font-size: 43px; 
    }

In index.js change import to: import "./styles/index.scss";

In webpack.config.js rules, change test to: test: /.s?css$/i,

Add sass and it's loader: npm i -D sass sass-loader

Then add the sass loader in webpack use, like so: use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],

Add post.css: 
    npm i -D postcss postcss-preset-env postcss-loader

Create postcss.config.js in root folder with this code: 
    module.exports = { 
        plugins: ["postcss-preset-env"] 
    }

In webpack:

    Add postcss-loader before sass-loader, like so: 
        use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader", "sass-loader"],

In webpack.config.js 
    in rules->test change style file searching to be more dynamic ant target sass, scss and css like this: test: /.(s[ac]|c)ss$/i,

Build and run to see if it works.

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

React commit:

Add React support:

    npm i react react-dom

    npm i -D @babel/preset-react

In babel.config.js: 
    module.exports = { 
        presets: [
            "@babel/preset-env", 
            ["@babel/preset-react", {runtime: "automatic"}]
        ], 
    };

Since react 17+ they partnered with babel and made an option to not have to import react when youre only using jsx in a file and under the hood it's supposed to make it a little more efficient. So the only time you'd need to import react is when you need methods or states or anything like it to run react library.

In src create: components/App.jsx

Transfer scss import to App component: 
    import "../styles/index.scss";

import App.jsx to index.js 
    import App from "./components/App"; and use it

Now it will not be found, so in webpack.config.js: resolve: { extensions: [".js", ".jsx"], },

    Makes so whenever you import something, you don't have to add these extensions

    Also in test change : test: /.js$/, to test: /.jsx?$/,

In index.js add: 
    import {createRoot} from "react-dom/client";
    import App from "./components/App";

    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);

    root.render(<App/>);

npm run build

Image support commit:

    Add images support:

    In the past you would use a file loader or a url loader, in webpack 5 there's a built in way to do it without any packages at all.

    In webpack.config.js add a new rule: 
        { test: /.(png|jpe?g|gif|svg)$/i, type: "asset", },

    Also update styles rule to this:

    { 
        test: /.(s[ac]|c)ss$/i,
        use: [ 
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" }, }, 
            "css-loader", 
            "postcss-loader", 
            "sass-loader", 
        ], 
    },

    For cleaner image distribution in dist. Add an output in webpack.config.js:

    output: { assetModuleFilename: "images/[hash][ext][query]", },

    Now the image files will be put in dist/images

    To clean the dist folder in package.json in scripts add: "clean": "rimraf ./dist",

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Automated cleaning and html template commit:
    AUTOMATED CLEANING AND HTML TEMPLATE
        npm i -D html-webpack-plugin

    In webpack.config.js add: 
        const HtmlWebpackPlugin = require("html-webpack-plugin");

    And add a plugin in plugins:
        plugins: [
            new MiniCssExtractPlugin(), 
            new HtmlWebpackPlugin({ template: "./src/index.html" })
        ],

    Targets premade index.html to be used for creating dist folder.

    Drag index.html from dist folder to src folder.

    Remove duplicates from index.html template (the ones that it automatically creates in dist folder index).

    To clean dist automatically add plugin:
        npm i -D clean-webpack-plugin

    In webpack.config.js add: 
        const { CleanWebpackPlugin } = require("clean-webpack-plugin");

    And in the plugins at the top add: 
        new CleanWebpackPlugin(),

    To check if it works, create a giberish file and run build, it should get removed.

    If it doesnt work, add: const path = require("path");
    In output add: path: path.resolve(__dirname, "dist")

---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

React fast refresh commit:

    REACT FAST REFRESH It's a hot reloading for react. BUT IT'S YET EXPERIMENTAL!

    npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh

    In babel.config.js: 
        plugins: ["react-refresh/babel"],

    In webpack.config.js: 
        const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

    In plugins add: 
        new ReactRefreshWebpackPlugin(),

    To module.exports add entry: 
        entry: "./src/index.js",

    It's possible to set a refresh reset in a file in case you don't want hot reloading in it by using pragma: 
        // @refresh reset

    To avoid error, in babel.config.js configure it so:

        const plugins = [];

        if (process.env.NODE_ENV !== "production") { plugins.push("react-refresh/babel"); }

        module.exports = { 
            presets: [ 
                "@babel/preset-env", 
                ["@babel/preset-react", 
                { runtime: "automatic" }], 
            ], 
            plugins: plugins, 
        };

    In webpack.config.js: 
        Add a plugins array and in development mode push required plugin into it, change the plugins in module.exports to 
            plugins: plugins

        const plugins = [ 
            new CleanWebpackPlugin(), 
            new MiniCssExtractPlugin(), 
            new HtmlWebpackPlugin({ template: "./src/index.html" }), 
        ];
    
    To avoid the error with npm build-dev In webpack.config.js push the required plugin in this way:
        
        if (process.env.NODE_ENV === "production") { 
            mode = "production"; 
        } 
        if (process.env.SERVE) { 
            plugins.push(new ReactRefreshWebpackPlugin()); 
        }

        plugins: plugins
    
    In package.json change start script to: 
        "start": "cross-env SERVE=true webpack serve",


    
