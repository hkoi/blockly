'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  return gulp.src('blockly_compressed.js')
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global = that;'))
      .pipe(insert.wrap('var DOMParser = require("xmldom").DOMParser;\nvar XMLSerializer = require("xmldom").XMLSerializer;\nmodule.exports = (function() { var that = {}; that.navigator = ""; ', ' return Blockly; })()'))
      .pipe(rename('blockly_wrapped.js'))
      .pipe(gulp.dest("."));
});

