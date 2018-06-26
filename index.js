/*
 * vuejs-text-logger plugin for Vue.js 2.x
 */

module.exports = {
  install: (Vue, options) => {
    Vue.prototype.$logger = {
      saveToLog(fileName, data) {
        if (options.logs && options.logsPath !== '' && fileName !== '' && data !== '') {
          const fs = require('fs');
          const path = require('path');
          
          // Create the logs' path
          const file = path.join(options.logsPath, fileName);

          // Compose the 'data' field
          if (options.appendDate) {
            const moment = require('moment');
            data = `[${moment(new Date()).format('DD/MM/YYYY, HH:mm:ss')}] ${data}\r\n`;
          } else {
            data = `${data}\r\n`;
          }          

          try {
            // Check if the directory exists otherwise create it
            if (!fs.existsSync(options.logsPath)) {
              fs.mkdirSync(options.logsPath);

              // Append the requested message to a new file
              fs.appendFileSync(file, data, 'utf-8');
              return true;
            }

            // Check if the file already exists
            if (fs.existsSync(file)) {
              // Check the file dimension
              const stats = fs.statSync(file);
              const fileSizeInBytes = stats.size;
              const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

              // If the file is over options.maxFileDimension in MB then delete the first line
              if (fileSizeInMegabytes >= options.maxFileDimension) {
                fs.readFile(file, 'utf8', (err, data) => {
                  if (err) {
                    return false;
                  }
                  const linesExceptFirst = data.split('\n').slice(1).join('\n');
                  fs.writeFileSync(file, linesExceptFirst, 'utf-8');
                  return true;
                });
              }
            }

            // Append the requested message to the file
            fs.appendFileSync(file, data, 'utf-8');
          }
          catch (e) {
            return false;
          }
        }
        return true;
      },
    };
  },
};
