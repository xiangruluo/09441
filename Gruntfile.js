module.exports = function(grunt) {
    // 针对当前项目的配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),// 从 package.json 文件读入数据

        copy: {
            img: {
                files: [
                    {
                        expand: true, flatten: false,
                        cwd: 'public/img/',
                        src: ['**'],
                        dest: 'public/build/img/'
                    },
                    {
                        expand: true, flatten: false,
                        cwd: 'public/img/',
                        src: ['**'],
                        dest: 'public/build/img/'
                    }
                ]
            }
        },
        uglify: { //定义任务做什么
            options: { // 这里，我们可以修改任务的许多行为
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/js/<%= pkg.name %>.js', // 定义要处理的文件位置
                dest: 'build/js/<%= pkg.name %>.min.js' //定义处理后的文件存放位置
            }
        },
        requirejs: {
            js: {
                options: {
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    include: ['requireLib'],
                    name: 'main',
                    out: "public/build/main.js"
                }
            },
            css: {
                options: {
                    baseUrl: 'public/css',
                    cssIn: "public/css/main.css",
                    out: "public/build/main.css",
                    cssImportIgnore: null,
                    optimizeCss: 'default'
                }
            }
        },
        watch: {
            img: {
                files: ['public/img/*'],
                tasks: ['copy:img', 'requirejs:css'],
                options: {
                    nospawn: true,
                    interrupt: false
                }
            },
            css: {
                files: ['public/css/*.css'],
                tasks: ['requirejs:css'],
                options: {
                    nospawn: true,
                    interrupt: false
                }
            },
            js: {
                files: ['public/js/*.js', 'public/js/*/*.js'],
                tasks: ['requirejs:js'],
                options: {
                    nospawn: true,
                    interrupt: false
                }
            }
        }
    });

    // 加载插件 任务谁来做
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //requirejs
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.loadNpmTasks('grunt-contrib-watch');
    // 注册一个默认任务
    grunt.registerTask('default', ['uglify','requirejs']);
    grunt.registerTask('dev', ['watch']);
};