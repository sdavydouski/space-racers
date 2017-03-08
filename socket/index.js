const racing = require('./racing');

module.exports = server => {
    const io = require('socket.io').listen(server);
    racing.init(io.of('/racing'))
};
