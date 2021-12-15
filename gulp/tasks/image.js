module.exports = () =>
    $.gulp.task('img', () =>
        $.gulp.src($.path.src.img)
            // .pipe($.gp.imagemin([
            //     $.gp.imagemin.mozjpeg({ quality: 75, progressive: true }),
            //     $.gp.imagemin.optipng({ optimizationLevel: 5 })
            // ]))
            .pipe($.gp.webp())
            .pipe($.gulp.dest($.path.build.img)).on('end', $.bs.reload)
)