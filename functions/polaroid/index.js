'use strict';

const gm = require('gm') //.subClass({imageMagick: true});
const fs = require('fs');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

exports.frameIt = event => {
  const object = event.data || event; // Node 6: event.data === Node 8+: event

  // Exit if this is a deletion or a deploy event.
  if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  } else if (!object.name) {
    console.log('This is a deploy event.');
    return;
  }

  const file = storage.bucket(object.bucket).file(object.name);
  const filePath = `gs://${object.bucket}/${object.name}`;

  // Ignore already-framed files (to prevent re-invoking this function)
  if (file.name.startsWith('polaroid--')) {
    console.log(`The image ${file.name} is already framed.`);
    return;
  }

  console.log(`Analyzing ${file.name}.`);

        return frameImage(file);
};

function frameImage(file) {
    const tempLocalPath = `/tmp/${path.parse(file.name).base}`;
    return file
        .download({destination: tempLocalPath})
        .catch(err => {
        console.error('Failed to download file.', err);
        return Promise.reject(err);
    }).then(() => {
        console.log(
            `Image ${file.name} has been downloaded to ${tempLocalPath}.`
        );
        
        return new Promise((resolve, reject) => {
            gm(tempLocalPath)
                .out("\(")
                .background("#FFFFFF")
                .fill("#F69D9D")
                .pointsize("24")
                .label("Sarah and Rob\n2019/03/09")
                .trim()
                .repage()
                .bordercolor("#FFFFFF")
                .gravity("South")
                .append()
                .out("\)")
                .bordercolor("#FFFFFF")
                .border("10")
                .gravity("South")
                .chop("0x10")
                .write(tempLocalPath, (err, stdout) => {
                    if(err) {
                        console.error("Failed to convert image.", err);
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                });
            });
        })
    .then(() => {
        console.log(`Image ${file.name} has been framed.`);
        return new Promise((resolve, reject) => {
            f.unlink(tempLocalPath, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            });
        });
    });
}

    
