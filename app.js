const app = () => {
   const song=document.querySelector(".song");
   const video=document.querySelector(".vid-container video");
   const play=document.querySelector(".play");
   const outline=document.querySelector(".moving-outline circle");

   const sounds=document.querySelectorAll(".sound-picker button");
   const timeDisplay=document.querySelector(".time-display");
   const timeSelect=document.querySelectorAll(".time-select button");
   // get total length of circle
   const outlineLength=outline.getTotalLength();
   console.log(outlineLength);
   let fakeDuration=600;

    //pick sound
    sounds.forEach(sound => {
        sound.addEventListener("click",function(){
            song.src=this.getAttribute("data-sound");
            video.src=this.getAttribute("data-video");
            checkPlaying(song);          
        });
    });

   outline.style.strokeDasharray=outlineLength;
   outline.style.strokeDashoffset=outlineLength;

   play.addEventListener("click", () =>{
       checkPlaying(song);
   });
   
    timeSelect.forEach(option => {
        option.addEventListener("click",function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent=`${fakeDuration / 60}:${fakeDuration % 60}`;
            song.currentTime=0;
        })
    });

   const checkPlaying = song =>{
    if(song.paused){
        song.play();
        video.play();
        play.src = "svg/pause.svg";
    }else{
        song.pause();
        video.pause();
        play.src = "svg/play.svg";
    }
   }

   song.ontimeupdate = () => {
      let currentTime=song.currentTime;
      let elapsed=fakeDuration-currentTime;
      let seconds=Math.floor(elapsed % 60);
      let minutes=Math.floor(elapsed / 60);
      let progress = outlineLength -(currentTime / fakeDuration)*outlineLength;
      outline.style.strokeDashoffset=progress;
      timeDisplay.textContent=`${minutes}:${seconds}`;
      if(currentTime >= fakeDuration){
        song.currentTime=0;
        song.pause();
        video.pause();
        play.src="svg/play.svg"
      }
   }
}


app();