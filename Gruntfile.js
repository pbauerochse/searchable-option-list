module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        qunit: {
            all: ['test/**/*.html'],
            options: {
                timeout: 10000
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/sol.css': 'src/sol.src.scss'
                }
            }
        },

        copy: {
            main: {
                files: [
                    {src: 'src/sol.src.js', dest: 'dist/sol.js'}
                ],
            },
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true,
                sourceMapName: 'dist/sol.min.js.map'
            },
            build: {
                src: 'src/sol.src.js',
                dest: 'dist/sol.min.js'
            }
        },

        cssmin: {
            minify: {
                src: 'dist/sol.css',
                dest: 'dist/sol.min.css',
                options: {
                    sourceMap: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'qunit', 'sass', 'copy', 'uglify', 'cssmin']);

};
