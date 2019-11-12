module.exports = {
    entry: './bin/js/index.js',
    mode: 'production',
    devtool: 'inline-source-map',
    resolve: {
      extensions: [ '.js' ]
    },
    output: {
        filename: 'Tilemate.min.js'
    },
    performance: {
      hints: false
    }
}