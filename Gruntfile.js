module.exports = function(grunt) {
	
	grunt.initConfig({
		// Basic settings and info about our plugins
		pkg:grunt.file.readJSON('package.json'),

		watch:{
			options:{livereload:true},
			less:{
				files:['assets/css/style.less'],
				tasks:['less','cssmin'],
			}
		},

		less:{
			development:{
				options:{
					paths:["assets/css/"]
				},
				files:{
					'assets/css/style.css':'assets/css/style.less'
				}
			}
		},
		// name of plugin 
		cssmin:{
			combine:{
				files:{
					'assets/css/todo.min.css':[
					'assets/css/bootstrap.css',
					'assets/css/toastr.css',
					'assets/css/jquery-confirm.css',
					'assets/css/style.css'
					]
				}
			}
		},

		// uglify
		uglify :{
			dist:{
				files:{
					'assets/js/todo.min.js':[
					'assets/js/jquery-1.12.3.min.js',
					'assets/js/bootstrap.js',
					'assets/js/toastr.js',
					'assets/js/moment.js',
					'assets/js/jquery-confirm.js',
					'assets/js/angular.js',
					'assets/js/angular-moment.js',
					]
				}
			}
		},

		express:{
			all:{
				options:{
					port:9000,
					hostname:'localhost',
					bases:['.'],
					livereload:true
				}
			}
		},

		ngdocs: {
		  all: ['assets/js/app.js']
		}

	});
	
	//Load the plugins
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-ngdocs');

	// Do the task
	grunt.registerTask("default",['less','cssmin','uglify','ngdocs']);
	grunt.registerTask("makedoc",['ngdocs']);
	grunt.registerTask("serve",['express','watch']);

}