/*
 * grunt-templatecombine
 * https://github.com/hubert.zub/templatecombine
 *
 * Copyright (c) 2014 Hubert Zub
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('templatecombine', 'Combines built angular templates and injects them into index.html', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var str = '';
      var files = (grunt.file.expand(appConfig.dist + this.data));

      files.forEach(function(file) {
            // <!DOCTYPE
            // <html>
            var fileStr = grunt.file.read(file);
            if (/!DOCTYPE/i.test(fileStr) || /\<html\>/i.test(fileStr)) return;

            str += '<script type="text/ng-template" id="' + file.substr(appConfig.dist.length) + '">\n';
            str += fileStr;
            str += '</script>\n';
            grunt.file.delete(file);
      });

      var indexFile = grunt.file.read(appConfig.dist + "/index.html");
      indexFile = indexFile.replace(/<!-- templateCombine -->/g, str);
      grunt.file.write(appConfig.dist + "/index.html", indexFile);
  });

};
