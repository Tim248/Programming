module.exports = () => 
    $.gulp.task('style', () =>
        $.gulp.src($.path.src.style)
            .pipe($.sourcemaps.init({loadMaps: true}))
            .pipe($.gp.sass({ outputStyle: 'expanded'}))
            .pipe($.gp.autoprefixer())
            .pipe($.gp.groupCssMediaQueries())
            .pipe($.gp.sass({ outputStyle: 'compressed'}))
            .pipe($.gp.rename('main.min.css'))
            .pipe($.sourcemaps.write('/'))
            .pipe($.gulp.dest($.path.build.style)).on('end', $.bs.reload)

    )