let video = document.querySelector('.media');
let playPause = document.querySelector('.play-pause');
let fwr = document.querySelector('.fwr');
let bcwr = document.querySelector('.bcwr');
let totalTimeElement = document.querySelector('.total-time');
let currentTimeElement = document.querySelector('.current-time');
let primaryProgress = document.querySelector('.video-range');
let secondaryProgress = document.querySelector('.progressbar');
let volumeProgress = document.querySelector('.range-volume');
let volumeIcon = document.querySelector('.volume-icon i');

playPause.addEventListener('click', function() {
    if (video.paused) {
        playPause.style.bottom = '50px';
        video.play()
    } else {
        playPause.style.bottom = '0px';
        video.pause()
    }
})

primaryProgress.addEventListener('input', function(e) {
    video.currentTime = (this.value / 100) * video.duration;
})

fwr.addEventListener('click', function() {
    video.currentTime = video.currentTime + 5;
})
bcwr.addEventListener('click', function() {
    video.currentTime = video.currentTime - 5;
});
video.addEventListener('timeupdate', function() {
    let progress = Math.floor((video.currentTime / video.duration) * 100);
    showSecondaryProgress(progress);
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
volumeIcon.addEventListener('click', function() {
    this.classList.toggle('mute');
    let root = document.querySelector(':root');
    if (this.classList.contains('mute')) {
        volumeProgress.value = 0;
        video.volume = 0;
        root.style.setProperty('--volume-progress', `0%`);
        this.className = 'fa fa-volume-mute mute';
    } else {
        volumeProgress.value = 25;
        video.volume = 0.25;
        root.style.setProperty('--volume-progress', `25%`);
        this.classList.replace('fa-volume-mute', 'fa-volume-down');
    }
})
volumeProgress.addEventListener('input', function() {
    let root = document.querySelector(':root');
    root.style.setProperty('--volume-progress', `${this.value}%`)
    video.volume = Number((this.value)) / 100;
    if (Number(this.value) > 60) {
        volumeIcon.className = 'fa fa-volume-up';
    } else if (0 < Number(this.value) && Number(this.value) < 60) {
        volumeIcon.className = 'fa fa-volume-down';
    } else if (Number(this.value) === 0) {
        volumeIcon.className = 'fa fa-volume-mute mute';
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
const showSecondaryProgress = (progress) => {
    if (progress > 50) {
        let leftProgress = 180 - ((progress * 3.6) - 180);
        secondaryProgress.querySelector('.bar.left .progress').style = `transform: rotate(-${Math.floor(leftProgress)}deg)`;
        secondaryProgress.querySelector('.bar.right .progress').style = 'transform: rotate(0deg)';
    } else {
        let rightProgress = 180 - (progress * 3.6);
        secondaryProgress.querySelector('.bar.right .progress').style = `transform: rotate(-${Math.floor(rightProgress)}deg)`;
        secondaryProgress.querySelector('.bar.left .progress').style = 'transform: rotate(-180deg)';
    }
}

const getTotalTime = () => {
    let totalTime = getTime(Math.floor(video.duration));
    totalTimeElement.querySelector('.hours').textContent = totalTime.hoursTotal;
    totalTimeElement.querySelector('.minutes').textContent = totalTime.minutesTotal;
    totalTimeElement.querySelector('.seconds').textContent = totalTime.secondsTotal;
    video.volume = 0.25;
}