//Initializing The Variable

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    var index;
    for (let i = 0; i < 4; i++) {
        if (songs[i].filePath === audioElement.getAttribute('src')) {
            index = i;
            break;
        }
    }
    if (audioElement.paused || audioElement.currentTime <= 0) {
        document.getElementsByClassName('songItemPlay')[index].classList.add('fa-pause-circle');
        document.getElementsByClassName('songItemPlay')[index].classList.remove('fa-play-circle');
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        document.getElementsByClassName('songItemPlay')[index].classList.remove('fa-pause-circle');
        document.getElementsByClassName('songItemPlay')[index].classList.add('fa-play-circle');
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
});

//Listen To Events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        var index;
        for (let i = 0; i < 4; i++) {
            if (songs[i].filePath === audioElement.getAttribute('src')) {
                index = i;
                break;
            }
        }
        if ((!audioElement.paused || audioElement.currentTime > 0) && (songIndex == index)) {
            audioElement.pause();
            gif.style.opacity = 0;
            audioElement.currentTime = 0;
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
        }
        else {
            makeAllPlays();
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    })
});

document.getElementById('next').addEventListener('click', () => {
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-pause-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');
    if (songIndex >= 3) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});

document.getElementById('previous').addEventListener('click', () => {
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-pause-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});