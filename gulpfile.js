'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  return gulp.src(['blockly_compressed.js', './blocks_compressed.js', './javascript_compressed.js', './msg/js/en.js'])
      .pipe(concat('blockly_wrapped.js'))
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global = that;'))
      .pipe(insert.wrap('var DOMParser = require("xmldom").DOMParser;\nvar XMLSerializer = require("xmldom").XMLSerializer;\nmodule.exports = (function() { var that = {}; that.navigator = ""; ', ' return Blockly; })()'))
      .pipe(gulp.dest("."));
});
