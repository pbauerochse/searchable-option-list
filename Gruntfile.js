module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            all: ['test/**/*.html'],
            options: {
                timeout: 10000
            }
        },

        sass: {
            options: {
                // style: 'compressed'
            },
            dist: {
                files: {
                    'sol.css': 'src/sol.src.scss'
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true,
                sourceMapName: 'sol.min.map'
            },
            build: {
                src: 'src/sol.src.js',
                dest: 'sol.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['qunit', 'sass', 'uglify']);

}
