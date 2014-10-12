var socket = io('http://scotrad.io:3003/socket.io');

socket.on('new show', function(info) {
    document.querySelector('.now-playing').textContent = info;
});
