const musicContainer=document.querySelector('.music-container');
const playBtn=document.querySelector('#play');
const prevBtn=document.querySelector('#prev');
const nextBtn=document.querySelector('#next');
const audio=document.querySelector('#audio');
const progress=document.querySelector('.progress');
const progressContainer=document.querySelector('.progress-container');
const title=document.querySelector('#title');
const cover=document.querySelector('#cover');
const toggle=document.querySelector('.bi-play-fill');

// own code
/*
const wit=document.querySelector('#wit');
const w=document.documentElement.clientWidth;
wit.textContent=`width is: ${w}`;
*/

//Song Titles
const songs=['aot','cowboyB','deathNote','naruto','neonG'];
var songTitle;

//Keep Track of songs
let songIndex=4;

//Initially load songs into DOM
loadSong(songs[songIndex]);

//Update SOng Details
function loadSong(song){
    switch(song){
        case 'aot':
            songTitle='Attack on Titan OP';
            break;
        case 'cowboyB':
            songTitle='Cowboy Bebop OP';
            break;
        case 'deathNote':
            songTitle='Death Note OP';
            break;
        case 'naruto':
            songTitle='Naruto Shippuden OP';
            break;
        case 'neonG':
            songTitle='Neon Genesis Evangaleon OP';
            break;
    }
    title.innerText=songTitle;
    audio.src=`./music/${song}.mp3`;
    cover.src=`./images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    toggle.classList.remove('bi-play-fill');
    toggle.classList.add('bi-pause-fill');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    toggle.classList.add('bi-play-fill');
    toggle.classList.remove('bi-pause-fill');

    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex<0){
        songIndex=songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex>songs.length-1){
        songIndex=0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    // console.log(e.srcElement.currentTime);
    // console.log(e.srcElement.duration);
    const {duration,currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

function setProgress(e){
    const width=this.clientWidth;
    // console.log(width);
    const clickX=e.offsetX;
    // console.log(clickX);
    const duration=audio.duration;
    audio.currentTime=(clickX/width)*duration;
}

//Event Listeners
playBtn.addEventListener('click',()=>{
    const isPLaying=musicContainer.classList.contains('play');

    if(isPLaying){
        pauseSong();
    }
    else{
        playSong();
    }
});
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);//time update is an API

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);