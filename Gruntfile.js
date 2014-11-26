module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            check: {
                src: ['*.js', 'app/routes/*.js'];
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
