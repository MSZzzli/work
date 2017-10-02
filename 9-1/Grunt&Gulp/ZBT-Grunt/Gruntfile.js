module.exports = function (grunt) {
    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-compress')

    // 配置任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 连接文件任务
        concat: {
            // 连接文件的选项
            options: {
                // 分隔符会插入到文件之间
                separator: '\r\n\r\n/*==============================*/\r\n\r\n',
                // 会出现在文件最开头部分
                banner: '/*! <%= pkg.description %> - <%= pkg.author %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            // 一个具体的连接动作
            dist: {
                // 要连接文件列表
                src: ['jquery/jquery.js', 'jquery/jquery.fullscreen.js',
                    'js/FullScreen.js', 'js/SecondManager.js',
                    'js/Label.js', 'js/Differences.js',
                    'js/Scene.js', 'js/StartScene.js',
                    'js/GameScene.js', 'js/TimeoutScene.js',
                    'js/CompleteScene.js', 'js/Audio.js',
                    'js/Game.js', 'js/GameSceneDatas.js',
                    'js/Main.js'],
                // 连接后生成的文件
                dest: 'game.js',
            }
        },
        // 压缩js文件，也可连接js文件
        uglify: {
            // 压缩选项
            options: {
                // 会出现在文件最开头部分
                banner: '/* <%= pkg.description %> - <%= pkg.author %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\r\n'
            },
            // 一个具体的压缩动作
            game: {
                // 配置要压缩的文件
                files: {
                    // 压缩后生成的文件：待压缩的文件，可以有多个
                    'dist/game.js': ['game.js']
                }
            }
        },
        // 监视文件变化并自动执行任务
        watch: {
            // 一个具体的监视 
            game: {
                // 要监视文件
                files: ['js/*.js', 'Gruntfile.js'],
                // 当文件变化时要执行的任务
                tasks: ['concat', 'uglify']
            },
            css: {
                files: ['index.css'],
                tasks: ['cssmin']
            },
            html: {
                files: ['index.html'],
                tasks: ['htmlmin']
            }
        },
        // 压缩css文件
        cssmin: {
            // 一个具体的压缩动作
            index: {
                // 配置压缩文件
                files: {
                    // 压缩后的生成的文件：待压缩的文件列表
                    'dist/index.css': ['index.css']
                }
            }
        },
        // 压缩html文件
        htmlmin: {
            options: {                                 
                removeComments: true,
                collapseWhitespace: true
            },
            index: {
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, src:['images/*', 'mp3/**'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },
        clean: {
            dist: ['dist/', '找不同.zip'],
            clear: ['dist/', 'node_modules', '找不同.zip']
        },
        compress: {
            dist: {
                options: {
                    archive: '找不同.zip'
                },
                files:[
                    // 使用expand和cwd去掉压缩包中的dist文件夹
                    // 将dist中的文件直接放入压缩包
                    {expand: true, cwd: 'dist/', src: ['**']}
                ]
            }
        }
    })

    // 构建代码
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin', 'htmlmin'])
    // 默认任务：构建并监视
    grunt.registerTask('default', ['build', 'watch'])
    // 发布
    grunt.registerTask('dist', ['clean:dist', 'build', 'copy', 'compress'])
}