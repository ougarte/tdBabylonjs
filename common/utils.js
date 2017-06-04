const fs = require('fs');
const path = require('path');

exports.readJSONFile = function (filePath) {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, stream)=> {
            if(error) reject(error);
            else resolve(JSON.parse(stream));
        });
    });

    return promise;
}