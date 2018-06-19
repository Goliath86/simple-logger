# vuejs-text-logger
![node](https://img.shields.io/node/v/passport.svg?style=plastic)

A very simple logger plugin for Node.js and Vue.js 2.x

With this plugin you can log to a text file all the logs informations that you want as strings, line by line. It is possible to specify a file name, a file path and the maximum size of the log file. If the maximum size of the file is reached, old data will be overwritten with new ones.

## Installation

```npm
npm install vuejs-text-logger
```

## Usage
On your main.js file of your Vue project, write these lines:

```js
import logger from 'vuejs-text-logger'

Vue.use(logger, options);
```
where `options` is an object:

```js
options: {
  logs: true,             // A {boolean} value that indicates if logger must be turned on or off
  logsPath: '',           // A {string} file path where to save the log files
  maxFileDimension: 50    // An {integer} indicating the max files dimensions in Megabytes
}
```

then in your project you can use it as:

```js
this.$logger.saveToLog(fileName, data)
```

where `filename` is a string containing the log's filename and `data` is a string containing every kind of data to be written inside the log file.

You can save your logs'data in more than one log file using this plugin by specifying different filenames to pass at the `saveToLog` function:

```js
this.$logger.saveToLog('aLogFile.txt', 'This is a log file');
this.$logger.saveToLog('anotherLogFile.txt', 'This is another log file');
```
then in your `logsPath` directory you will find two files named `aLogFile.txt` and `anotherLogFile.txt`

During the logging if one or more files reach the `maxFileDimension` specified on plugin intialization, then the plugin provides to overwrite old data.
