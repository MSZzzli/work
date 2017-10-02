// 定义一个模块，并且导出一个函数
module.exports = grunt => {
    // 初始化grunt配置
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        // 读取一个json文件，将json文件转换成（JSON.parse）一个对象       
 
        // 定义一个动作：concat的作用是连接多个文件为一个文件
        concat: {
            // 动作的选项
            options: {
                banner: '/*智游教育*/\n'
            },
            // 动作涉及的文件
            dist: {
                // 要连接的文件
                // 同级目录 src: '/',  否则例如：src: 'js',
                src: '<%=package.srcFiles%>',
                // 连连后生成的文件
                dest: 'js/<%=package.name%>.js'
            }
        },
        
        // 压缩js的动作
        uglify: {
            // 动作目标
            my_target: {
                // 涉及的文件
                files: {
                    // 压缩后生成的文件    ：    需要压缩的文件列表
                    // 同级目录 'index.min.js': ['index.js'],  否则例如：'js/index.min.js': ['js/index.js'],
                    'js/zy-clock.min.js': ['js/zy-clock.js']
                }
            }
        },
        // 定义一个监视文件变化的动作
        watch: {
            // 监视一组文件，当文件变化时执行相应的动作或任务
            scripts: {
                // 被监视的文件  
                files: ['gruntfile.js', 'package.json', 'src/*.js'],
                // 当文件变化时要执行任务
                tasks: ['default']
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    // 加载grunt插件模块包
    
    grunt.registerTask('default', ['concat', 'uglify'])
    // grunt.registerTask('abc', ['concat', 'uglify']);
    // 注册任务，注册后可以使用名字执行已注册的任务
    // 第1个参数：任务名字(default：那么想执行这个任务，可以在终端输入 grunt/grunt default；
    // 不命名为 default，比如 abc：那么执行这个任务必须输入 grunt abc)
    // 第2个参数：具体要执行动作，可以是多个动作按顺序执行
}