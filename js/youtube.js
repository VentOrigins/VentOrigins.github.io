/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

var player = null;
var done = false;

/*  =============================================================================
    These next couple functions displays the youtube player    

    @param      none 
    @return     none
    ========================================================================== */
// 1, Starts the process of displaying a Youtube player
function displayYoutube() {
  showYTPlayer();
  if(player != null) {
    loadYTVideo();
  }
  else {
    displayYouTubePlayer();
  }
}

// 2. This code loads the IFrame Player API code asynchronously.
function displayYouTubePlayer() {
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
  //Pause queue when YT is paused
  if(event.data == YT.PlayerState.PAUSED) {
    pauseQueue();
  }
  //Resume queue when YT is plays
  if(event.data == YT.PlayerState.PLAYING) {
    resumeQueue();
  }
  //Next queue when YT is finished
  if (event.data == YT.PlayerState.ENDED) {
    nextQueue();
  }
}

/*  =============================================================================
    These next functions do exactly what their names intend them to do

    @param      none
    @return     none
    ========================================================================== */
function stopVideo() {
  if(player != null) {
    player.stopVideo();
  }
}

function pauseVideo() {
  if(player != null) {
    player.pauseVideo();
  }
}

function playVideo() {
  if(player != null) {
    if ($('#youTubePlayer').css('display') != 'none') {
      player.playVideo();
    } 
  }
}

function hideYTPlayer() { 
  $("#youTubePlayer").hide();
}

function showYTPlayer() {
  $("#youTubePlayer").show();
}

function loadYTVideo() {
  player.loadVideoById(localStorage.getItem('currPlaying'),0,"large");
}

/*  =============================================================================
    Parses the youtube duration into an actual time.
    The format is PT H M S, with the white spaces being the times
    An example is given below on how the parse is done
    Called from: displayYoutubeOnOverlay    

    @param      string    The time duration to be parsed
    @return     string    The parsed time duration
    ========================================================================== */
function parseVideoDuration(time) {
  // PT4H32M3S
  time = time.replace("PT", "");
  var parsedHour = '';
  var parsedMinute = '0';
  var parsedSecond = '00';
  var arrayTime = [];
  var parsedTime = '';

  // PARSES THE HOUR
  // 4H32M3S
  if (time.indexOf('H') != -1) {
    arrayTime = time.split('H');
    parsedHour = arrayTime[0];
    time = arrayTime[1];
  }

  // PARSES THE MINUTES
  // 32M3S
  if (time.indexOf('M') != -1) {
    arrayTime = time.split('M')
    parsedMinute = arrayTime[0];
    if (parsedHour != '' && parseInt(parsedMinute) < 10) {
      parsedMinute = '0' + parsedMinute;
    }
    time = arrayTime[1];
  }
  else {
    if (parsedHour != '') {
      parsedMinute = '00'
    }
  }

  // PARSES THE SECONDS
  //3S
  if (time.indexOf('S') != -1) {
    time = time.replace("S", "");
    parsedSecond = time;
    if (parseInt(parsedSecond) < 10) {
      parsedSecond = '0' + parsedSecond;
    }
  }

  // Puts them all together
  if (parsedHour != '') {
    parsedTime = parsedHour + ':' + parsedMinute + ':' + parsedSecond;
  }
  else {
    parsedTime = parsedMinute + ':' + parsedSecond; 
  } 
  return parsedTime;
}






