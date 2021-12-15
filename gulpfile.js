global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    sourcemaps: require('gulp-sourcemaps'),
    bs: require('browser-sync').create(),
    path: {
        tasks: require('./gulp/config'),
        serverDir: './app/build',
        watch: {
            html: ['./app/src/*.{html,pug}', './app/src/view/**/*.{html,pug}'],
            style: './app/src/styles/**/*.*',
            js: './app/src/scripts/**/*.*',
            img: './app/src/images/**/*.*',
            video: './app/src/video/*.*',
            fonts: './app/src/fonts/**/*.*'
        },
        src: {
            html: './app/src/*.{html,pug}',
            style: './app/src/styles/*.*',
            js: './app/src/scripts/common.js',
            img: './app/src/images/**/*.{png,jpg,svg,webp}',
            video: './app/src/video/*.*',
            fonts: './app/src/fonts/**/*.*'
        },
        build: {
            html: './app/build/',
            style: './app/build/styles/',
            js: './app/build/script/',
            img: './app/build/images/',
            video: './app/build/video/',
            fonts: './app/build/fonts/'
        }
    },
    tasks: {
        default: ['html','style','js','img','fonts','video','watch','serve'],
        build: ['html','style','js','img','fonts','video']
    }
}

$.path.tasks.forEach(taskPath => require(taskPath)())

for(let key in $.tasks) {
    $.gulp.task(key, $.gulp.series($.gulp.parallel(...$.tasks[key])))
}



