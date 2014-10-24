var socket = io('http://scotrad.io:3003/socket.io');

socket.on('new show', function(show) {
    document.querySelector('.current').textContent = show.name;
    document.querySelector('.picture').style.backgroundImage = show.picture;
});
