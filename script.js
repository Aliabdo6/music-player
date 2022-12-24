const music = document.querySelector('audio');
const prevBtn =document.getElementById('prev');
const playBtn =document.getElementById('play');
const nextBtn =document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');


const songs = [
    {
        name: '2_Much',
        disPlayName : '2_Much',
        artist: 'Justin',
    },
    {
        name:'Anyone',
        disPlayName: ' Anyone',
        artist:'Justin'
    },
    {
        name:'As_It_Was',
        disPlayName:'As_It_Was',
        artist:'Harry'
    },
    {
        name:'Come_Around_Me',
        disPlayName:'Come_Around_Me',
        artist:'Justin'
    },
    {
        name:'No Time To Die',
        disPlayName:'No Time To Die',
        artist:'Billie'
    }
];

//check if playing
let isPlaying = false;



//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause' , 'fa-play' );
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play or pause 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong() ) );

// update Dom
function loadSong(song){
    title.textContent = song.disPlayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};

let songIndex = 0;
// prev
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


//next
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1 ){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


loadSong(songs[songIndex]);


function updateProgressBar(e) {
    if (isPlaying) {
      const { duration, currentTime } = e.srcElement;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}


prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);