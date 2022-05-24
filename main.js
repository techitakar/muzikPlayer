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
    audio.src=`./music/${song}.mp3`; //audio.src=1.mp3 is bascially <audio src="1.mp3" class="audio"></audio>
    cover.src=`./images/${song}.jpg`; //cover is an img object, so cover.src=1.jpg is <img src="1.jpg" class="cover">
}

function playSong(){
    musicContainer.classList.add('play');
    toggle.classList.remove('bi-play-fill');
    toggle.classList.add('bi-pause-fill');

    audio.play(); //.play() is a built in audio API
}

function pauseSong(){
    musicContainer.classList.remove('play');
    toggle.classList.add('bi-play-fill');
    toggle.classList.remove('bi-pause-fill');

    audio.pause(); //.pause() is a built in audio API
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
    const {duration,currentTime}=e.srcElement; //API
    const progressPercent=(currentTime/duration)*100; //eg. 1 mins out of 3 mins completed, 1/3 *100=30
    progress.style.width=`${progressPercent}%`;//style.width=30%
}

function setProgress(e){
    const width=this.clientWidth; //suppose clientWidth=300px
    // console.log(width);
    const clickX=e.offsetX;//suppose clickX=100px
    // console.log(clickX);
    const duration=audio.duration;//duaration is an API, duration=3 mins
    audio.currentTime=(clickX/width)*duration;//currentTime is also an API= (100/300)*3mins=> 1 min
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