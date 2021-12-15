module.exports = () =>
    $.gulp.task('watch', () => {
        for(let key in $.path.watch) {
            let pathWatch = $.path.watch[key]
            $.gulp.watch(pathWatch, $.gulp.series(key))
        }
    })