'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

var wrap1 = 'var DOMParser = require("xmldom").DOMParser;\n';
wrap1 += 'var XMLSerializer = require("xmldom").XMLSerializer;\n';
wrap1 += 'var document = require("jsdom").jsdom();\n';
wrap1 += 'module.exports = (function() { var that = {}; that.navigator = "";\n';

gulp.task('default', function() {
  return gulp.src(['blockly_compressed.js', './blocks_compressed.js', './javascript_compressed.js', './msg/js/en.js'])
      .pipe(concat('blockly_wrapped.js'))
      .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global = that;'))
      .pipe(insert.wrap(wrap1, ' return Blockly; })()'))
      .pipe(gulp.dest("."));
});
