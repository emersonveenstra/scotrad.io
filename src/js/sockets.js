var socket = io('http://scotrad.io/socket.io');

socket.on('new show', function(show) {
    document.querySelector('.current').textContent = show.name;
    document.querySelector('.picture').style.backgroundImage = show.picture;
});
