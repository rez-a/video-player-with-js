let video = document.querySelector('.media');
let playPause = document.querySelector('.play-pause');
let fwr = document.querySelector('.fwr')
let bcwr = document.querySelector('.bcwr')

playPause.addEventListener('click', function() {
    if (video.paused) {
        playPause.style.bottom = '50px';
        video.play()
    } else {
        playPause.style.bottom = '0px';
        video.pause()
    }
})

fwr.addEventListener('click', function() {
    video.currentTime = video.currentTime + 5;
})
bcwr.addEventListener('click', function() {
    video.currentTime = video.currentTime - 5;
})