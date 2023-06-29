console.log("Welcome to Spotify!");

//Initialize the variables
let songIndex = 1;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Tongue Tied",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover1.jpg",
  },
  {
    songName: "Favorite Girl",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover2.jpg",
  },
  {
    songName: "Bad Boys",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover3.jpg",
  },
  {
    songName: "Mombattiye",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover4.jpg",
  },
  {
    songName: "Superstar",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover5.jpg",
  },
  {
    songName: "Yaar Beli",
    filePath: "songs/1.mp3",
    coverPath: "covers/cover6.jpg",
  },
];

songItems.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    let count = 0;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element) => {
        count++;
        if (count == songIndex) {
          element.classList.remove("fa-play-circle");
          element.classList.add("fa-pause-circle");
        }
      }
    );
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    let count = 0;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element) => {
        count++;
        if (count == songIndex) {
          element.classList.remove("fa-pause-circle");
          element.classList.add("fa-play-circle");
        }
      }
    );
    gif.style.opacity = 0;
  }
});

//Listen to events
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  //Update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  if (progress == 100) {
    songIndex += 1;
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    let count = 0;
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (element) => {
        count++;
        if (count == songIndex) {
          makeAllPlays();
          element.classList.remove("fa-play-circle");
          element.classList.add("fa-pause-circle");
        }
      }
    );
  }
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-pause-circle")) {
        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
      } else {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 6) songIndex = 1;
  else songIndex += 1;
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  let count = 0;
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      count++;
      if (count == songIndex) {
        makeAllPlays();
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
      }
    }
  );
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) songIndex = 6;
  else songIndex -= 1;
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  let count = 0;
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      count++;
      if (count == songIndex) {
        makeAllPlays();
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
      }
    }
  );
});
