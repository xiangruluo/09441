module.exports = function(grunt) {
    // 针对当前项目的配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),// 从 package.json 文件读入数据

        concat: {
            //合并所有用到的css文件
            css: {
                src: [
                        'public/components/bootstrap/docs/assets/css/bootstrap.css',
                        'public/stylesheets/style.css',
                        'public/components/font-awesome/css/font-awesome.css',
                        'public/components/validator/jquery.validator.css'
                     ],
                dest:'public/build/css/main.css'
            },
            //合并所有用到的js文件
            js: {
                src: [
                    'public/components/jquery/jquery.js',
                    'public/components/bootstrap/docs/assets/js/bootstrap.js',
                    'public/components/validator/jquery.validator.js',
                    'public/components/validator/local/zh_CN.js'
                ],
                dest: 'public/build/js/main.js'
            }
        },

        uglify: {
            //压缩合并后的js文件main.js
            build: {
                //压缩前的目录
                src: 'public/build/js/main.js',
                //压缩后的目录
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
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 注册默认任务
    grunt.registerTask('default', ['concat', 'uglify','cssmin']);
};