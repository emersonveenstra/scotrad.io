module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                ignores: ['src/js/ga.js']
            },
            check: {
                src: ['src/js/*.js']
            }
        },
        autoprefixer: {
            dist: {
                src: 'src/css/styles.css',
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
        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/imgs',                   // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'public'                  // Destination path prefix
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/script.js': ['node_modules/socket.io/node_modules/socket.io-client/socket.io.js', 'src/js/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify', 'autoprefixer', 'cssmin', 'imagemin']);
    grunt.registerTask('css', ['autoprefixer', 'cssmin']);
    grunt.registerTask('js', ['jshint', 'uglify']);
    grunt.registerTask('img', ['imagemin']);
};