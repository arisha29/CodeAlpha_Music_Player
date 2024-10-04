// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('assets/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "*NSYNC - Bye Bye Bye (Deadpool 3 Soundtrack)", filePath: "assets/songs/1.mp3", coverPath: "assets/images/cover1.jpg" },
    { songName: "Taylor Swift - Down Bad", filePath: "assets/songs/2.mp3", coverPath: "assets/images/cover2.jpg" },
    { songName: "Taylor Swift - Fortnight feat. Post Malone", filePath: "assets/songs/3.mp3", coverPath: "assets/images/cover3.jpg" },
    { songName: "Day 29/50 | Friend", filePath: "assets/songs/4.mp3", coverPath: "assets/images/cover4.jpg" },
    { songName: "Alan Walker - Faded", filePath: "assets/songs/5.mp3", coverPath: "assets/images/cover5.jpg" },
    { songName: "Lil Tjay - Calling My Phone ft. 6LACK", filePath: "assets/songs/6.mp3", coverPath: "assets/images/cover6.jpg" },
    { songName: "One Direction - Night Changes", filePath: "assets/songs/7.mp3", coverPath: "assets/images/cover7.jpg" },
    { songName: "The Script - Hall Of Fame", filePath: "assets/songs/8.mp3", coverPath: "assets/images/cover8.jpg" },
    { songName: "Trevor Daniel - Falling", filePath: "assets/songs/9.mp3", coverPath: "assets/images/cover9.jpg" },
    { songName: "Justin Bieber - Baby ft. Ludacris", filePath: "assets/songs/10.mp3", coverPath: "assets/images/cover10.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})