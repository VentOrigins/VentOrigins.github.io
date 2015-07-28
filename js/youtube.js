var player;
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
  var splashHeight = $("#splash-screen").height();
  var splashWidth = $("#splash-screen").width();
  player = new YT.Player('youTubePlayer', {
    height: splashHeight,
    width: splashWidth,
    videoId: localStorage.getItem('currPlaying'),
    events: {
      'onReady': onPlayerReady
    }
  });
  changeYouTubeSize();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

function stopVideo() {
  player.stopVideo();
}
function hideYTPlayer() {
  $("#youTubePlayer").hide();
}





