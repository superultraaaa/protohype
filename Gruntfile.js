module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'src/css/style.css' : 'src/css/style.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			dist: {
				files: {
					'dest/css/style.css' : 'src/css/style.css'
				}
			}
		},
		includes: {
			files: {
				src: [
					'src/index.html'
				],
				dest: 'dest',
				flatten: true,
				cwd: '.',
				options: {
					silent: true
				}
			}
		},
		copy: {
			main: {
				expand: true,
				cwd: 'src/',
				src: [
					'lib/components/jquery/dist/jquery.min.js',
					'lib/components/bootstrap/dist/js/bootstrap.min.js',
					'lib/components/bootstrap/dist/css/bootstrap.min.css'
				],
				dest: 'dest/',
				flatten: false
			}
		},
		uglify: {
			main: {
				files: {
					'dest/js/main.min.js': [
						'src/js/main.js'
					]
				}
			}
		},
		watch: {
			css: {
				files: 'src/css/**.scss',
				tasks: [
					'sass',
					'autoprefixer'
				]
			},
			html: {
				files: 'src/**.html',
				tasks: [
					'includes'
				]
			},
			scripts: {
				files: 'src/js/main.js',
				tasks: [
					'uglify'
				]
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-includes');
	grunt.registerTask('default',['watch']);
}