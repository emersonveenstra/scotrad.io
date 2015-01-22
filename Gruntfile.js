module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            check: {
                src: ['*.js', 'routes/*.js']
            }
        },
        sass: {
            dist: {
                options: {
                    trace: true,
                    style: 'expanded',
                    precision: 5
                },
                files: {
                    'src/css/main-unprefixed.css': 'src/scss/main.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                src: 'src/css/main-unprefixed.css',
                dest: 'src/css/main.css'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/main.css': 'src/css/main.css'
                }
            }
        },
        watch: {
            dist: {
                files: ['src/scss/*.scss'],
                tasks: ['csscheck']
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'sass', 'autoprefixer', 'cssmin', 'watch']);
    grunt.registerTask('csscheck', ['sass', 'autoprefixer', 'cssmin']);
};
