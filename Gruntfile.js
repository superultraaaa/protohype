module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		postcss: {
			options: {
				processors: [
					require('precss')(),
					require('autoprefixer')(),
					require('cssnano')
				]
			},
			dist: {
				files: {
					'dist/css/style.min.css' : 'src/css/style.css'
				}
			}
		},
		includes: {
			files: {
				src: [
					'src/index.html'
				],
				dest: 'dist',
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
					'dist/js/main.min.js': [
						'src/js/main.js'
					]
				}
			}
		},
		watch: {
			css: {
				files: 'src/css/**.css',
				tasks: [
					'postcss'
				]
			},
			html: {
				files: 'src/**/*.html',
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-includes');
	grunt.registerTask('default',['watch']);
}