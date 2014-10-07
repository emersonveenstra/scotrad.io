var streaming = true;

function nostream() {
    document.querySelector('.nostream').style.visibility = 'visible';
    document.querySelector('audio').style.display = 'none';
    document.querySelector('.now-playing').style.display = 'none';
    streaming = false;
}