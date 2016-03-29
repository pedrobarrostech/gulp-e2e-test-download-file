'use strict';

import gulp from 'gulp';
import exec from 'gulp-exec';
import util from 'gulp-util';
import gulpProtractor from 'gulp-protractor';

// Specs files
const specPattern = './test/functional/specs/*.spec.js';

// Download and update the selenium driver
const webdriver_update = gulpProtractor.webdriver_update;
const webdriver_standalone = gulpProtractor.webdriver_standalone;
// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);
// Runs the selenium webdriver
gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('e2e', ['webdriver_update'],  () => {
    gulp.src(specPattern, {
        read: false
    }).pipe(gulpProtractor.protractor({
        configFile: 'test/protractor.conf.js'
    })).on('error',  (e) => {
        throw e;
    });
});

gulp.task('start', () => {
  gulp.src('./')         
    .pipe(exec('./download-file'));  
  	util.log('Listen: http://localhost:9999');
});



