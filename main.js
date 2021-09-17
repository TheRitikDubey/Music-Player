let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let artist_name = document.querySelector(".artist-name");

//buttons variables;
let prev_btn = document.querySelector(".prev-track");
let playPause_btn = document.querySelector(".curr");
let next_btn = document.querySelector(".next");

//Track sldier for changing the track times and more !;
let curr_time = document.querySelector(".curr-time");
let seek_slider = document.querySelector(".seek_slider");
let total_time = document.querySelector(".total-time");

//Slider for volume changer;
let volume_slider = document.querySelector(".volume_slider");

//initlize conditons of initial point of the web app; 
let track_idx = 0;
let isPlaying = false;
let update_timer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Tera Ban Jaaunga X Kho Gaye",
    artist: "Jasleen Royal , Akhil Sachdeva",
    image: "/Images/kho_gya.jpg",
    path: "/Songs/Tera Ban Jaaunga X Kho Gaye Hum Kahan X Dariya _ Lofi Mashup.mp3",
  },
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Software Engineer Anthem..",
    artist: "Gaurav Madaan",
    image: "/Images/software_engineer.jpg",
    path: "/Songs/Code Phat Gaya.mp3"

  },
  {
    name: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva and Tulsi Kumar",
    image: "/Images/tera_ban_jaunga.jpg",
    path: "/Songs/Tera Ban Jaunga.mp3",
  },
  {
    name: "MI Gente X Bollywood",
    artist: "DIVINE,EMIWAY BANTAI",
    image: "/Images/MI_gente.jpg",
    path: "/Songs/Machayenge X MI Gente X Sher Aaya Sher.mp3",
  },

  {
    name: "Let me Down slowly X Main Dhoondne",
    artist: "Arijit Singh X Alec Benjamin",
    image: "/Images/let_me_down.jpg",
    path: "/Songs/Let Me Down Slowly x Main Dhoondne Ko Zamaane Mein.mp3",
  },
  {
    name: "Let me Down slowly X Main Dhoondne",
    artist: "Arijit Singh X Alec Benjamin",
    image: "/Images/let_me_down.jpg",
    path: "/Songs/Let Me Down Slowly x Main Dhoondne Ko Zamaane Mein.mp3",
  },


];

function random_bg_color() {
  //Adding 64 for lighter color;
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;

}
function reset_values() {
  curr_time.textContent = "00:00";
  total_time.textContent = "00:00";
  seek_slider.value = 0;
}
function load_track(track_idx) {
  clearInterval(update_timer);
  reset_values();
  curr_track.src = track_list[track_idx].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_idx].image + ")";
  track_name.textContent = track_list[track_idx].name;
  artist_name.textContent = track_list[track_idx].artist;
  now_playing.textContent = "Playing " + (track_idx + 1) + " Of " + (track_list.length);

  update_timer = setInterval(seek_update, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}
//Play the song initially which is at idx 0 or 1;
load_track(track_idx);

function playPause() {
  if (isPlaying)
    pause_track();
  else
    play_track();
}
function play_track() {
  curr_track.play();
  isPlaying = true;
  playPause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pause_track() {
  curr_track.pause();
  isPlaying = false;
  playPause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_idx < track_list.length - 1)
    track_idx += 1;
  else
    track_idx = 0;
  load_track(track_idx);
  play_track();

}
function prevTrack() {
  if (track_idx == 0)
    track_idx = track_list.length;
  else
    track_idx -= 1;

  load_track(track_idx);
  play_track();
}
function seekTo() {
  let seek = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seek;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}


function seek_update() {
  let seek_position = 0;
  if (!isNaN(curr_track.duration)) {
    seek_position = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seek_position;
    let curr_min = Math.floor(curr_track.currentTime / 60);
    let curr_sec = Math.floor(curr_track.currentTime - curr_min * 60);
    let duration_min = Math.floor(curr_track.duration / 60);
    let duration_sec = Math.floor(curr_track.duration - duration_min * 60);

    if (curr_min < 10) {
      curr_min = "0" + curr_min;
    }
    if (curr_sec < 10) {
      curr_sec = "0" + curr_sec;
    }
    if (duration_min < 10) {
      duration_min = "0" + duration_min;
    }
    if (duration_sec < 10) {
      duration_sec = "0" + duration_sec;
    }

    curr_time.textContent = curr_min + ":" + curr_sec;
    total_time.textContent = duration_min + ":" + duration_sec;


  }

}









