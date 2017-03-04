require('babel-register')({
    plugins: ['transform-async-to-generator', 'transform-object-rest-spread']
});

require('./app');
