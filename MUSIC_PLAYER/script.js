let progress=document.getElementById("progress");
let song=document.getElementById("song");
let ctrlIcon=document.getElementById("ctrlIcon");
song.onload=function(){
  progress.max=song.duration;
  progress.value=song.currentTime;
}
function playPause(){
  if(ctrlIcon.classList.contains("bi-pause")){
    song.pause();
    ctrlIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg>
  `;
  }
  else{
    song.play();
    ctrlIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
      <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
    </svg>
  `;
  }
  ctrlIcon.classList.toggle("bi-pause");
  ctrlIcon.classList.toggle("bi-play-fill");

}

if(song.play()){
    setInterval(()=>{
      progress.value=song.currentTime;
    },500);
}
progress.onchange=function(){
song.play();
song.currentTime=progress.value;
ctrlIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>
`;
}

