var socket = io();

socket.on('new show', function(info) {
    document.querySelector('.now-playing').textContent = info;
});