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