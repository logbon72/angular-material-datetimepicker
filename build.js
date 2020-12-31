var esbuild = require('esbuild');

esbuild.build({
	entryPoints: ['./js/angular-material-datetimepicker.js'],
	minify: true,
	outdir: 'dist',
	sourcemap: true,
	outExtension: { '.js': '.min.js' },
}).catch(function(err) {process.exit(1);});

esbuild.build({
	entryPoints: ['./css/material-datetimepicker.css'],
	minify: true,
	outdir: 'dist',
	outExtension: { '.css': '.min.css' },
}).catch(function(err) {process.exit(1);});
