let video = document.querySelector('.media');
let playPause = document.querySelector('.play-pause');
let fwr = document.querySelector('.fwr');
let bcwr = document.querySelector('.bcwr');
let totalTimeElement = document.querySelector('.total-time');
let currentTimeElement = document.querySelector('.current-time');
let primaryProgress = document.querySelector('.video-range');

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
});
video.addEventListener('timeupdate', function() {
    let progress = Math.floor((video.currentTime / video.duration) * 100);
    let root = document.querySelector(':root');
    primaryProgress.value = `${progress}`;
    root.style.setProperty('--progress', `${progress}%`);
    let currentTime = getTime(Math.floor(video.currentTime));
    currentTimeElement.querySelector('.hours').textContent = currentTime.hoursTotal;
    currentTimeElement.querySelector('.minutes').textContent = currentTime.minutesTotal;
    currentTimeElement.querySelector('.seconds').textContent = currentTime.secondsTotal;
    if (video.ended) {
        playPause.style.bottom = '0px';
    }
})
const getTimeBelowTen = (time) => {
    if (time < 10) {
        return `0${time}`;
    }
    return time;
}
const getTime = (time) => {
    let hoursTotal = getTimeBelowTen(Math.floor(time / 3600));
    let minutesTotal = getTimeBelowTen(Math.floor((time - (hoursTotal * 3600)) / 60));
    let secondsTotal = getTimeBelowTen(Math.floor(time - ((hoursTotal * 3600) + (minutesTotal * 60))));
    return {
        hoursTotal,
        minutesTotal,
        secondsTotal
    }
}

function getTotalTime() {
    let totalTime = getTime(Math.floor(video.duration));
    totalTimeElement.querySelector('.hours').textContent = totalTime.hoursTotal;
    totalTimeElement.querySelector('.minutes').textContent = totalTime.minutesTotal;
    totalTimeElement.querySelector('.seconds').textContent = totalTime.secondsTotal;
}