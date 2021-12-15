class Player {
    constructor(selector) {
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.hidePanel = true;
        this.timer;
        this.playVideo();
    }

    playVideo() {
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.panel__left-play').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.circle').addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
        this.player.querySelector('.video__fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
        this.player.querySelector('.volume__mute').addEventListener('click', this.toggleVolume.bind(this));
        this.player.querySelector('.volume__slider').addEventListener('input', this.setVolume.bind(this));
        this.player.querySelector('.right__video-speed').addEventListener('input', this.setSpeed.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.currentVideoTime.bind(this));
        this.player.querySelector('.panel__line').addEventListener('click', this.setLinePos.bind(this));

    }

    toggleVideo() {
        this.playing = !this.playing;
        const playIcon = this.player.querySelector('.panel__left-play .left-play');
        const playCircle = this.player.querySelector('.circle');
        playIcon.classList.toggle('icon-play', !this.playing);
        playIcon.classList.toggle('icon-pause', this.playing);

        if (this.playing) {
            this.video.play();
            playCircle.style.opacity = '0'
            setTimeout(() => {
                document.querySelector('.player__panel').style.opacity = '0';
            }, 4000);
        }
        else {
            this.video.pause();
            playCircle.style.opacity = '1'
            document.querySelector('.player__panel').style.opacity = '1';
        }
    }

    toggleFullscreen() {
        const full = document.fullscreenElement;
        const fullIcon = this.player.querySelector('.video__fullscreen .full__screen')
        const iconPlay = this.player.querySelector('.circle');

        fullIcon.classList.toggle('icon-fullscrn', full);
        fullIcon.classList.toggle('icon-compress', !full);

        if (!full) {
            this.player.requestFullscreen();
            iconPlay.style.left = '56rem';
            iconPlay.style.top = '19rem';
        }
        else {
            document.exitFullscreen();
            iconPlay.style.left = '';
            iconPlay.style.top = '';
        }
    }

    toggleVolume() {
        this.sounding = !this.sounding;
        const muteVolume = this.player.querySelector('.volume__mute .fad');
        const volumeSlider = this.player.querySelector('.volume__slider');

        muteVolume.classList.toggle('icon-volumeup', !this.sounding);
        muteVolume.classList.toggle('icon-volumemute', this.sounding);

        if (this.sounding) {
            this.video.muted = true;
            volumeSlider.setAttribute('data-volume', volumeSlider.value);
            volumeSlider.value = 0;
        }
        else {
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute('data-volume');
        }
    }

    setVolume() {
        this.video.volume = this.player.querySelector('.volume__slider').value / 100;
    }

    setSpeed() {
        this.video.playbackRate = this.player.querySelector('.right__video-speed').value;
    }

    setVideoTime() {
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.video__time-duration').innerHTML = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;

    }

    currentVideoTime() {
        const duration = Math.floor(this.video.duration);
        const current = Math.floor(this.video.currentTime);
        let seconds = 0;

        if (current % 60 < 10) {
            seconds = `0${current % 60}`;
        }
        else {
            seconds = `${current % 60}`
        }

        this.player.querySelector('.video__time-current').innerHTML = `${Math.floor(current / 60)}:${seconds}`;
        this.player.querySelector('.panel__line-pos').style.width = `${current / duration * 100}%`;

        if (this.hidePanel) {
            this.hidePanel = false;
            this.timer = setTimeout(() => {
                this.player.querySelector('.player__panel').style.opacity = '0';
            }, 4000);
        }
        this.video.addEventListener('mousemove', this.hide.bind(this));
    }

    hide() {
        this.hidePanel = true;
        clearTimeout(this.timer);
        document.querySelector('.player__panel').style.opacity = '1';
    }

    setLinePos(event) {
        const lineWidth = this.player.querySelector('.panel__line').clientWidth;
        const pos = event.offsetX;
        const duration = Math.floor(this.video.duration);

        this.player.querySelector('.panel__line-pos').style.width = `${pos / lineWidth * 100}%`;
        this.video.currentTime = pos / lineWidth * duration;

    }
}
new Player('.player__items-right');