var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var path = require('path');
var staticNode = require('node-static');
var file = new staticNode.Server('./src');


gulp.task('less', function () {
    return gulp.src('./src/styles/*.less')
        .pipe(less({
            paths: [ path.join(__dirname) ]
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload({ start: true });
    livereload.listen({port: 8080});
    gulp.watch('./src/*.*', function () {
        livereload.reload();
    });
});

gulp.task('server', function() {
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(8080);

    console.log('local server started on http://localhost:8080');
});

gulp.task('default', ['watch']);