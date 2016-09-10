#!/bin/bash
npm install
./node_modules/bower/bin/bower install
node ./node_modules/gulp/bin/gulp.js serve
