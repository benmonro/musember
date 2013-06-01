'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // load the default charcoal grunt configuration
  var config = require('./charcoal/grunt').config;

  // if you'd like to modify the default grunt config, do it here
  // for example:
  // config.less = { ... }

    config.copy.server = {

        files:
            [{
                expand: true,
                dot: true,
                cwd: 'dist',
                dest: '../server/public',
                src: [
                    '**'
                ]
            }]
        //{expand:true, dest:"../server/public", src:['dist/**']}
    };
  // concurrent tasks. customize this instead of the multitasks for faster 
  // builds
  config.concurrent = {
    server: [
      'ember_templates',
      'coffee:dist',
      'neuter:app',
      'copy:dev'
    ],
    test: [
      'ember_templates',
      'coffee',
      'neuter'
    ],
    dist: [
      'ember_templates',
      'neuter:app',
      'copy:dev',
      'copy:dist',
      'coffee',
      'imagemin',
      'svgmin',
      'htmlmin',
      'copy:server'
    ]
  };

  grunt.initConfig(config);

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'copy:dev',
    'copy:test',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('test-server', [
    'clean:server',
    'concurrent:test',
    'copy:dev',
    'copy:test',
    'connect:test',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin',
    'concat',
    'uglify',
    'copy:dev',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);


    grunt.registerTask('deploy',[
        'default',
        'copy:server'
    ]);
};
