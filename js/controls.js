var media;
let intervalforward;
let intervalBackward;
const speedMedia = 3;

window.addEventListener("load", inicio);

function inicio(){
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");
    const backwardButton = document.getElementById("backwardButton");
    const forwardButton = document.getElementById("forwardButton");
    media = document.getElementById("media");

    playButton.addEventListener("click", playPauseMedia);
    stopButton.addEventListener("click", stopMedia);
    stopButton.addEventListener("ended", stopMedia);
    backwardButton.addEventListener("click", backwardMedia);
    forwardButton.addEventListener("click", forwardMedia);    
}
function playPauseMedia(){
    if(media.paused){
        playButton.innerHTML = "Pause";
        media.play();        
    }else{
        playButton.innerHTML = "Play";
        media.pause();
    }
    clear();
}
function stopMedia(){
    media.pause();
    media.currentTime = 0;
    playButton.innerHTML = "Play";
    clear();
}
function backwardMedia(){
    clearInterval(intervalforward);
    forwardButton.classList.remove('active');
    if(backwardButton.classList.contains('active')){
        backwardButton.classList.remove('active');
        clearInterval(intervalBackward);
        media.play();
    }else{
        backwardButton.classList.add('active');
        intervalBackward = setInterval(windBackward, 200);
        media.play();
    }
}
function forwardMedia(){
    clearInterval(intervalBackward);
    backwardButton.classList.remove('active');
    if(forwardButton.classList.contains('active')){
        forwardButton.classList.remove('active');
        clearInterval(intervalforward);
        media.play();
    }else{        
        forwardButton.classList.add('active');
        media.pause();
        intervalforward = setInterval(windForward, 200);
    }
}
function windBackward(){
    if(media.currentTime <= speedMedia){
        clearInterval(intervalBackward);
        backwardButton.classList.remove('active');
        stopMedia();
    }else{
        media.currentTime -= speedMedia;
    }
}
function windForward(){   
    if(media.currentTime >= media.duration - speedMedia){        
        forwardButton.classList.remove('active');
        clearInterval(intervalforward);
        stopMedia();
    }else{
        media.currentTime += speedMedia;        
    }
}
function clear(){
    clearInterval(intervalforward);
    clearInterval(intervalBackward);
    if(backwardButton.classList.contains('active')){
        backwardButton.classList.remove('active');
    }
    if(forwardButton.classList.contains('active')){
        forwardButton.classList.remove('active');
    }
}
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs
//https://winbuzzer.com/2020/06/16/google-chrome-how-to-disable-autoplay-for-videos-xcxwbt/
