module.exports = () =>
    $.gulp.task('js', () =>
        $.gulp.src($.path.src.js)
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe($.gp.include())
            .pipe($.gp.babel())
            .pipe($.sourcemaps.write('/'))
            .pipe($.gulp.dest($.path.build.js)).on('end', $.bs.reload)
    )