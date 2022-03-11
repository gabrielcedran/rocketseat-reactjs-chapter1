# Rocketseat ReactJS Chapter 1

## Setting up the local environment

### Install node and npm

To ease node version management it recommended to use a version manager like nvm. It allows to easily install new versions and switch between them when working on multiple projects that require different versions at the same time.

### Install yarn package manager 

Yarn and npm have a lot of similarities (and compatibility). For many projects it doesn't really matter which one you use as both of them rely on the `package.json` file to manage the necessary dependency.

There are many ways of installing Yarn and one of them is using... npm :). To install using npm execute the command `npm install --global yarn`.

### Install VS Code, the relevant extensions and set up the default configuration

#### Intellij fonts:

To use the same fonts of intellij, download it from the jet brains website (https://www.jetbrains.com/lp/mono/) and install according to the OS.

Linux: extract the fonts into the folder `~/.local/share/fonts` or `/usr/share/fonts`.

MacOS: double click on the files with extension .ttf.

In the configutations search for editor.fontFamily and set it to `JetBrains Mono`.


## Booting up a new project foundation from scratch (without create-react-app)

### Create the project's base structure

In the root path create two directories - `src` and `public`. Inside public add an index.html file.

### Create the package.json file

To create the file using yarn, use the command `yarn init -y`. To use npm `npm init -y`.

### Add react dependency

- react: `yarn add react` - core module
- react-dom: `yarn add react-dom` - module to work with web projects (to allow react to integrate with the dom api)


### Add babel dependency and its configuration

Babel converts new javascript features into javascript code compatible with browsers and their required versions (according to the configurations). It allows developers to use the new features independently of them being browser compatible as it will take care of converting it.

To install babel execute the command `yarn add -D @babel/core @babel/cli @babel/preset-env`.

- core: where most features of babel are in
- cli: it is used to be able to execute babel from the command line (e.g `yarn babel -h`)
- preset-env: it is an extension that helps to identify the environment that application is being executed to convert the code in the best way possible (server side or browser and which browser versions) 


In the root path create a file named `babel.config.js` and add the following content:

```
module.exports = {
    presets: [
        '@babel/preset-env', 
    ]
}
```

To convert files via the command line client, execute the command `yarn babel src/{file}.js --out-file dist/{file}.js`
 
#### Configure babel to support react

By default babel does not support react code (it does not expect html like tags within the javascript code). 

To do so add the react preset dependency (`yarn add -D @babel/preset-react`) and include it in the babel presets config (an extra entry with '@babel/preset-react')


### Configure a bundler tool (webpack in this case)

Bundlers convert the application source into code and files that browsers (or engines) understand. For instance convert sass files into css files and handle file dependencies (usually declared with the import keyword). Webpack uses loaders to perform this operation.

To install webpack run the command `yarn add -D webpack webpack-cli webpack-dev-server`. In the root path, create a file named `webpack.config.js` and add the following content:

```
const path = require('path') // good practice to have the project running independently of OS

module.exports = {
    mode: 'development', // this mode runs faster as webpac does not optimise the output resources as it would for production.
    entry: path.resolve(__dirname, 'src', 'index.jsx'), // Entry tells webpack which file it should use to start the bundling process. __dirname means `this directory`. 
    output: { // where the bundled project should be placed
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: { // which type of files webpack should work on
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { // loader to delegate to the right tool the conversion before carrying out the bundling process. In other words, webpack delegates the conversion from jsx to js to babel before performing its own operations.
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
```
_To process jsx files, along with the proper configuration it is necessary to install babel-loader dependency `yarn add -D babel-loader`. It is the integration between webpack and babel._

In order to test that the basic configuration is working as expected, create two files: the index.jsx and another one. Import the second one in the index file and run the webpack command via terminal (`yarn webpack`). It should run free of errors and generate the correct file in the dist folder.

#### Add and configure a dev server

Dev servers enable hot deploy (or "hot bundling") whenever a file a changed and access the project via http request rather than directly from static files (which brings a bunch of limitation).

First add the dependency to webpack dev server using yarn (`yarn add -D webpack-dev-server`) and in sequence the following configuration in the webpack config file:

```
    devServer: {
        static: path.resolve(__dirname, 'public') // basically where the index.html file is 
    }
```

To bootup the server just run the command `yarn webpack serve`.

#### Configure source maps to ease debugging

Source maps helps when debugging the live code as it enables the browser to show the original code instead of the converted and simplified one. There is a bunch of modes when it comes to source map - some a bit more detailed that are meant for development and others less detailed that are meant for production (the main differences are the generation time and the final size).

To enable it, just add the following configuration in the webpack config file at the root level `devtool: 'eval-source-map'`. Eval-source-map is meant for development.

#### Segregate development and production environments

A well established approach is to use the environment variable `process.env.NODE_ENV` and check whether it is dev or prod. In the webpack config, create a constant that stores if it is development and apply ternaries whenever necessary (up to now in the devtool and mode). Example:

```
const isDevelopment = process.env.NODE_ENV !== 'production'

...

    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
```

##### Determining execution environment

On linux and mac, when executing webpack it is possible to pass an inline environment variable. E.g. `NODE_ENV=production yarn webpack` or `NODE_ENV=production yarn webpack serve`.

In order to mitigate differences between OS's when it comes to env variables there's a lib called `cross-env` (`yarn add -D cross-env`). 

To set environment variables with it, simply add the cross-env execution with the variables that need to be set before the actual command. E.g `yarn cross-env NODE_ENV=production webpack` or `yarn cross-env NODE_ENV=production webpack serve`. To make it even easier and prevent human mistakes, create scripts on package.json:

```
  "scripts": {
    "dev": "webpack serve",
    "build": "cross-env NODE_ENV=production webpack"
  },
```



## Starting with ReactJS

Inside the index.html, import the bundled file and add a div with the id "root". In the index.jsx use the react-dom to render the main component in the root div.

### Delegate the responsibility of injecting the generated bundle file into index.html to webpack

To reduce maintenance it is better to delegate to webpack the responsibility of injecting the generated bundle file into the index.html. E.g In case the output file name changes, nothing needs to be done as webpack take care of it.

`html-webpack-plugin` provides this functionality. First add the dependency using yarn (`yarn add -D html-webpack-plugin`). Then extend webpack configuration with the following:

```
const HtmlWebpackPlugin = require('html-webpack-plugin') // import the dependency

...
    // at the root level of the exports configuration, add the plugins property with the following value
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],

```

Now, everytime webpack is executed it will also generate the index.html with the generated bundle injected. 


### Avoiding importing React in every file that uses jsx code

Since version 17 it is possible to turn the import of React in every file that uses JSX optional. To do so, it is necessary to tweak babel react preset so that babel carries out this responsibility for us. Change the `preset-react` into a array (or tuple in this case :P) and the second position provide a configuration object with the property `runtime` as `automatic`.

```
    ['@babel/preset-react', {
        runtime: 'automatic'
    }]
```



