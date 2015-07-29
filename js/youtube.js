var player = null;
var done = false;
function displayYouTubePlayer() {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


}
      
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
function onYouTubeIframeAPIReady() {
  checkSize();
  var splashHeight = document.getElementById("splash-screen").offsetHeight;
  var splashWidth = document.getElementById("splash-screen").offsetWidth;
  player = new YT.Player('youTubePlayer', {
    height: splashHeight,
    width: splashWidth,
    videoId: localStorage.getItem('currPlaying'),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  checkSize();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    console.log("Finish YT");
    nextQueue();
  }
}

function stopVideo() {
  player.stopVideo();
}

function hideYTPlayer() {
  stopVideo();
  $("#youTubePlayer").hide();
}

function showYTPlayer() {
  $("#youTubePlayer").show();
}

function loadYTVideo() {
   player.loadVideoById(localStorage.getItem('currPlaying'),0,"large");
}





