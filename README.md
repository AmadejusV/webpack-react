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