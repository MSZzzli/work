// 导出模块
module.exports = function(grunt) {
	// 初始化 grunt 配置文件
	grunt.initConfig({
		// 读取 package.json 文件内容
		pkg: grunt.file.readJSON('package.json'),
		
		// 拼接 js 和 css
		concat: {
			build: {
				src: "js/*.js",
				dest: "dest/js/<%= pkg.name %>.js"
			},
			cssbuild: {
				src: "css/*.css",
				dest: "dest/css/<%= pkg.name %>.css"
			}
			
		},
		
		// 压缩 js
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			bulid: {
			 // 动态文件映射，
			 // 当任务运行时会自动在 "lib/" 目录下查找 "**/*.js" 并构建文件映射，
			 // 添加或删除文件时不需要更新 Gruntfile。
			 files: [
				{
					"dest/bin/<%= pkg.name %>.min.js": ['<%= concat.build.dest %>']
				},
			 ],
			}
		},	
		
		// 压缩 css
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify: {
					ascii_only: true
				}				
			},
			build: {
				files: [{
					"dest/css/<%= pkg.name %>.min.css": ['<%= concat.cssbuild.dest %>']
				}]
			}
		}
	
	
	});
	
	// 加载模块包
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	
	// 注册任务
    grunt.registerTask('default', ['concat','uglify','cssmin']);
}