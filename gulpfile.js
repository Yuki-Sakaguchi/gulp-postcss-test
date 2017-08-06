/**
 * gulp plugins
 */
var
gulp    = require('gulp'),
plumber = require('gulp-plumber'),
postcss = require('gulp-postcss');


/**
 * autoprefixerの対応ブラウザ
 */
var browsers = [
    'last 2 versions', // 主要ブラウザは最新のバージョンから２つ前まで
    'ie >= 10', // IEは10以上
    'iOS >= 8', // iOSは8以上
    'Android >= 4.2', // Androidは4.2以上
];


/**
 * postcss plugins
 */
var postcssPlugins = [
    require('postcss-import'), // cssファイルのインポート
    require('postcss-simple-vars'), // sassの様な変数
    require('postcss-nesting'), // sassの様なネスト
    require('autoprefixer')(browsers), // ベンダープレフィックス
    // require('CSSWring') // cssの圧縮
];


/**
 * css
 */
gulp.task('css', function() {
    // コンパイル元
    gulp.src('./src/css/main.css')

    // エラーでwatchを止めない
    .pipe(plumber({
        errorHandler: function(err) {
            console.log(err.messageFormatted);
            return this.emit('end');
        }
    }))

    // コンパイル（postCSS）
    .pipe(postcss(postcssPlugins))

    // コンパイル先
    .pipe(gulp.dest('./public/css/'));
});


/**
 * watch
 */
gulp.task('watch', function() {
    var path = [
        './src/css/*.css',
        '!./src/css/_*.css'
    ];
    gulp.watch(path, ['css']);
});
