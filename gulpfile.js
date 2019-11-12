const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');

const webpack = require('webpack-stream');
const webpackConf = require('./webpack.config.js');

function buildTypescript(done) {
    let tsProject = ts.createProject('tsconfig.json');

    return tsProject.src()
        .pipe(sm.init())
        .pipe(tsProject()).js
        .pipe(sm.write('.'))
        .pipe(gulp.dest('./bin/js/'))
        .on('end', () => gulp.src('./src/**/*.json')
            .pipe(gulp.dest('./bin/js/'))
            .on('end', done)
        );
}

function pack() {
    return gulp.src('./bin/js/**/*.js')
        .pipe(webpack(webpackConf))
        .pipe(gulp.dest('./bin'))
}

function clean(done) {
    rimraf.sync('./bin');
    done();
}

exports.buildTypescript = buildTypescript;
exports.pack = pack;
exports.clean = clean;
exports.build = gulp.series(buildTypescript, pack);
exports.default = gulp.series(exports.clean, exports.build);
