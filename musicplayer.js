let Current_Song = document.querySelector(".CurrentSong");
let Song_Image = document.querySelector(".SongImage");
let Song_Name = document.querySelector(".SongName");
let Song_Artist = document.querySelector(".SongArtist");

let Toggle_Button = document.querySelector(".ToggleSong");
let Next_Button = document.querySelector(".NextSong");
let Previous_Button = document.querySelector(".PreviousSong");

let SongSeeker = document.querySelector(".SongSeeker");
let VolumeSeeker = document.querySelector(".VolumeSeeker");
let Start_Time = document.querySelector(".SongStartTime");
let Total_Time = document.querySelector(".TotalSongDuration");

let Song_Index = 0;
let isPlaying = false;
let updateTimer;

//CREATE AUDIO ELEMENT
let Current_Songtrack = document.createElement('audio');

//MUSIC PLAYLIST 
let Playlist = [
  {
    name: "Weightless",
    artist: "Macroni Union",
    image: "images/weightless.jpg",
    path: "SONGS/Weightless-MacroniUnion.mp3"
  },
  {
    name: "River",
    artist: "Josh Gorban",
    image: "images/river.jpg",
    path: "SONGS/River-JoshGorban.mp3"
  },
  {
    name: "Watermark",
    artist: "Enya",
    image: "images/watermark.jpg",
    path: "SONGS/Watermark-Enya.mp3"
  },
  {
    name: "Surrender",
    artist: "Natalie Taylor",
    image: "images/surrender.jpeg",
    path: "SONGS/Surrender-NatalieTaylor.mp3"
  },
  {
    name: "Kings And Queens",
    artist: "Ava Max",
    image: "images/kingsandqueens.jpg",
    path: "SONGS/KingsAndQueens-AvaMax.mp3"
  },

];

//RANDOM COLOUR AS BACKGROUND
function BG_Color() {
  let red = Math.floor(Math.random() * 256) + 75;
  let green = Math.floor(Math.random() * 256) + 67;
  let blue = Math.floor(Math.random() * 256) + 75;

  let background_Color = "rgb(" + red + "," + green + "," + blue + ")";

  document.body.style.background = background_Color;
}


//LOADING THE SONG TO PLAY
function Load_Song(Song_Index) {
  clearInterval(updateTimer);
  Reset_Values();
  Current_Songtrack.src = Playlist[Song_Index].path;
  Current_Songtrack.load();

  Song_Image.style.backgroundImage = "url(" + Playlist[Song_Index].image + ")";
  Song_Name.textContent = Playlist[Song_Index].name;
  Song_Artist.textContent = Playlist[Song_Index].artist;
  Current_Song.textContent = "PLAYING " + (Song_Index + 1) + " OF " + Playlist.length;

  updateTimer = setInterval(seekUpdate, 1000);
  Current_Songtrack.addEventListener("ended", NextSong);
  BG_Color();
}

//RESETTING SEEK VALUES
function Reset_Values() {
  Start_Time.textContent = "00:00";
  Total_Time.textContent = "00:00";
  SongSeeker.value = 0;
}


//LOADING FIRST SONG
Load_Song(Song_Index);


//PLAYING AND PAUSING SONG
function Toggle_Song() {
  if (!isPlaying) Play_Song();
  else Pause_Song();
}

//PLAY SONG
function Play_Song() {
  Current_Songtrack.play();
  isPlaying = true;
  Toggle_Button.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

//PAUSE SONG
function Pause_Song() {
  Current_Songtrack.pause();
  isPlaying = false;
  Toggle_Button.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';;
}

//NEXT SONG NAVIGATION
function NextSong() {
  if (Song_Index < Playlist.length - 1)
    Song_Index += 1;
  else Song_Index = 0;
  Load_Song(Song_Index);
  Play_Song();
}

//PREVIOUS SONG NAVIGATION
function PrevSong() {
  if (Song_Index > 0)
    Song_Index -= 1;
  else Song_Index = Playlist.length;
  Load_Song(Song_Index);
  Play_Song();
}

//SONG SEEKING
function seekTo() {
  let seekto = Current_Songtrack.duration * (SongSeeker.value / 100);
  Current_Songtrack.currentTime = seekto;
}

//VOLUME SEEKING
function setVolume() {
  Current_Songtrack.volume = VolumeSeeker.value / 100;
}

// //UPDATING THE SONG DURATION ACCORDING TO SEEKBAR VALUE
function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(Current_Songtrack.duration)) {
    seekPosition = Current_Songtrack.currentTime * (100 / Current_Songtrack.duration);

    SongSeeker.value = seekPosition;

    let currentMinutes = Math.floor(Current_Songtrack.currentTime / 60);
    let currentSeconds = Math.floor(Current_Songtrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(Current_Songtrack.duration / 60);
    let durationSeconds = Math.floor(Current_Songtrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    Start_Time.textContent = currentMinutes + ":" + currentSeconds;
    Total_Time.textContent = durationMinutes + ":" + durationSeconds;
  }
}