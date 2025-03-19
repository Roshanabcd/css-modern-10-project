const pauseIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"  height="24" color="#000000" fill="none"> <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" /> <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" /></svg>';
const startIcon =
  '<svg id="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">  <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /></svg>';
const repeatOffIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none"> <path d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />    <path d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />  <path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const repeatIcon = '   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none"><path d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>'

const audio = new Audio(
  "https://cdn.pixabay.com/download/audio/2022/10/21/audio_2b228b709b.mp3?filename=lofi-relax-travel-by-lofium-123560.mp3"
);
audio.preload = false;

const player = {
  isRuning: false,
  isRepeat: false,
  controller: {
    repeat: () => audio.repeat(),
    play: () => audio.play(),
    pause: () => audio.pause()
  }
};

let animationFrame = null;

// BUTTONS
const buttonRepeat = document.querySelector(".btn-repeat");
const buttonPlay = document.querySelector(".btn-start");

const playerToggleRepeat = () => {
 
  if(!player.isRepeat){
      player.isRepeat = true
    buttonRepeat.querySelector('svg').innerHTML = repeatIcon;
  }else{
      player.isRepeat = false
     buttonRepeat.querySelector('svg').innerHTML = repeatOffIcon;
  }
};

const playerToggleStatus = () => {
  if (player.isRuning) {
    player.controller.pause();
    document.querySelector(".btn-start svg").innerHTML = startIcon;
  } else {
    player.controller.play()
    document.querySelector(".btn-start svg").innerHTML = pauseIcon;
  }

  player.isRuning = !player.isRuning;
};

buttonPlay.addEventListener("click", playerToggleStatus);
buttonRepeat.addEventListener("click", playerToggleRepeat);

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Formata como "mm:ss" se o áudio passou de 60 segundos
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds} ${remainingSeconds > 1 ? "" : ""}`;
  }

  // Exibe só os segundos se for menos de 60
  return `${remainingSeconds} ${remainingSeconds > 1 ? "" : ""}`;
}

// View Status
const progressRootElement = document.querySelector("input");
const progressElement = document.querySelector(".input");
const durationElement = document.querySelector(".duration");
const currentTimeElement = document.querySelector(".current-time");

const updateProgress = (value) => {
  progressElement.style.setProperty("--input-width", `${value}%`);
};

const isLoaded = () => {
  const duration = (audio.duration / 60).toFixed(2);
  const progressPercentage = (audio.currentTime / audio.duration) * 100;

  durationElement.textContent = duration;
  progressRootElement.value = progressPercentage;
  progressElement.style.setProperty("--input-width", `${progressPercentage}%`);
  currentTimeElement.textContent = formatTime(audio.currentTime);
};

const updateProgressBar = () => {
  const progressPercentage = (audio.currentTime / audio.duration) * 100;
  updateProgress(progressPercentage);
  currentTimeElement.textContent = formatTime(audio.currentTime);
};

audio.addEventListener("loadeddata", isLoaded);
audio.addEventListener("timeupdate", updateProgressBar);

// REPEAT
audio.addEventListener("ended", () => {
  if (player.isRepeat) {
    audiocurrentTime = 0;
    updateProgress(0);
    audio.play();
  }
});
