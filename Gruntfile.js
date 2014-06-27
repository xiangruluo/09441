module.exports = function(grunt) {
    // 针对当前项目的配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),// 从 package.json 文件读入数据

        concat: {
            //合并所有用到的css文件
            css: {
                src: [
                        'public/css/*.css',
                        'public/components/bootstrap/dist/css/bootstrap.css',
                        'public/components/bootstrap/dist/css/bootstrap-theme.css',
                        'public/stylesheets/style.css'
                     ],
                dest:'public/build/css/main.css'
            },
            //合并所有用到的js文件
            js: {
                src: [
                    'public/components/bootstrap/dist/js/bootstrap.js',
                    'public/components/jqBootstrapValidation/dist/jqBootstrapValidation-1.3.7.js',
                    'public/components/jquery/dist/jquery.js'
                ],
                dest: 'public/build/js/main.js'
            }
        },

        uglify: {
            //压缩合并后的js文件main.js
            build: {
                src: 'public/build/js/main.js',
                dest: 'public/build/js/main.min.js'
            }
        },

        cssmin: {
            //压缩合并后的css文件main.css
            css: {
                options: {
                    keepSpecialComments: 1
                },
                src: ['public/build/css/main.css'],
                dest: 'public/build/css/main.min.css'
            }
        }
    });

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 注册默认任务
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};