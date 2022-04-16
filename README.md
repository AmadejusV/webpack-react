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