/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var loop = false; //Check to see if loop is true or fals
var shuffle = false; //Check if shuffle true or false
var shuffle_position;
var shuffle_array; //Array of numbers to shuffle through

// When button is pressed to play queue
/*  =============================================================================
    

    @param      int   position of next Song
    @return     none
    ========================================================================== */
function playQueue(position) {
  //If empty queue, just return
  if (localStorage.getItem("length") === null) {
    return;
  }

  //If top title doesn't exist insert it
  if(!$('#top-title').length) {
    insertTopSearchBar();
    $("#ppQueue").empty();
    $("#ppQueue").append("<button onclick='pauseQueue(0)'><i class='fa fa-pause'></i></button>");
  }

  //Gets top of list on queue
  var found = false;
  console.log(position + " Playqueue");
  console.log(localStorage.getItem('length') + "Length");
  var i = position;

  while (!found) {

    //At the end of length
    if(i == parseInt(localStorage.getItem('length'))) {
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
    if (localStorage.getItem(i.toString()) != null) {
      console.log("IF2");
      found = true;  

      // Go to displaying song if youtube or soundcloud
      $('#li' + i).css('background-color','#71B500');
      $('#li' + i + ' button').css('background-color','#71B500');
      setCurrentPosition(i.toString());
      displayVideoOrTrack(localStorage.getItem(i.toString()));

      // Highlights top list on queue or etc.
      
    }

    ++i;
  }
}
function pauseQueue() {
  stopSCPlayer();
  pauseVideo();
  $("#ppQueue").empty();
  $("#ppQueue").append("<button onclick='resumeQueue()'><i class='fa fa-play'></i></button>");
}

function resumeQueue() {
  playVideo();
  playSCPlayer();
  $("#ppQueue").empty();
  $("#ppQueue").append("<button onclick='pauseQueue()'><i class='fa fa-pause'></i></button>");
}

/*  =============================================================================
    When user clicks on the play button, it goes to this function first, checking
    if the app is in shuffle mode or not. If it is not, start playing first song
    in top of queue. If app is in shuffle mode, play a randomized song in the
    queue.

    From: Onclick: play-button
    To: playQueue.js: playQueue()

    @param      none
    @return     none
    ========================================================================== */
function playShuffleOnClick(){
  console.log("playSHuffleOnCLick")

  // If the shuffle is off, starts the queue at top of queue
  if (shuffle == false) {
    console.log("playSHuffleOnCLick SHUFFLE OFF")
    playQueue(0);
  }
  // If the shuffle is on, starts the queue at a random song
  else {
    console.log("playSHuffleOnCLick SHUFFLE ON")
    var qLength = parseInt(localStorage.getItem('length'));
    var randomized = Math.floor(Math.random() * qLength);
    console.log('Randomized:' + randomized);
    console.log('Randomized:' + Math.floor(Math.random() * qLength));
    // playQueue(randomized);
    shuffleQueue();
  }
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function nextQueue() {

  if (localStorage.getItem("currPlaying") == null && shuffle == true) {
    shuffleQueue();
    return;
  }
  else if (localStorage.getItem("currPlaying") == null && shuffle == false) {
    playQueue(0);
    return; 
  }
  
  // Unhighlights the previous track to emphasize change of current song
  $('#li' + parseInt(localStorage.getItem('currPosition'))).css('background-color','#FFFFFF');
  $('#li' + parseInt(localStorage.getItem('currPosition')) + ' button').css('background-color','#FFFFFF');
  
  if(shuffle == true) {
    shuffleQueue();
    return;
  }

  //Get next on list of queue
  var currPos = parseInt(localStorage.getItem('currPosition')) + 1;
  console.log("Next Queue currPos" + currPos);
  //check if loop is true then loop if not check if false then stop videos and return
  if(parseInt(localStorage.getItem('length')) <= currPos && loop == true) {
    console.log("looptrue");
    currPos = 0;
  }
  else if(parseInt(localStorage.getItem('length')) <= currPos && loop == false) {
    console.log("loopfalse");
    closeAllVideo();
    $("#ppQueue").empty();
    $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
    return;
  }
  playQueue(currPos);
}


function closeAllVideo() {
  hideSCPlayer();
  stopSCPlayer();
  hideYTPlayer();
  stopVideo();
  insertSplashSearchBar();
  localStorage.removeItem('currPlaying');
  localStorage.removeItem('currPosition');
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function prevQueue() {

  if (localStorage.getItem("currPlaying") === null) {
     playQueue(0);
     return;
  }
  if(shuffle == true) {
    //Shuffle position is on next one so we need to minus 2
    shuffle_position = shuffle_position - 2;
    if(shuffle_position < 0) {
      shuffle_position = shuffle_array[shuffle_array.length - 1]
    }
      shuffle_position++;
    playQueue(shuffle_position);
    return;

  }
  var currPos = parseInt(localStorage.getItem('currPosition')) - 1;
  console.log("Prev Queue currPos" + currPos);
  if(currPos <= 0) {
    currPos = 0;
  }
  playQueue(currPos);

}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function removeQueue(position) {
  var pos = position.toString();
  $("#li"+pos).remove();
  localStorage.removeItem(pos);
  console.log(localStorage.getItem(pos));
  if(localStorage.getItem('currPosition') == pos) {
    nextQueue();
  }

 }

 /*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function shuffleQueue() {
  //Check if array at end if it is then shuffle new queue
  console.log('Shuffle_position: ' + shuffle_position)
  if( (shuffle_array.length) == shuffle_position - 1) {
    if(loop == true) {
      shuffleAllQueue();
    }
    else {
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
  }
  //Get new position
  console.log('SHUFFLE_POSITION: ' + shuffle_position);
  var newPosition = shuffle_array[shuffle_position];
  console.log('POSITION: ' + newPosition);
  //Position increase
  shuffle_position++;
  //Make sure song is not null
  while(localStorage.getItem(newPosition.toString()) == null) {
    newPosition = shuffle_array[shuffle_position];
    shuffle_position++;

    //Error checking
    if( (shuffle_array.length - 1) == shuffle_position) {
      if(loop == true) {
        shuffleAllQueue();
      }
      else {
        closeAllVideo();
        $("#ppQueue").empty();
        $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>'");
        return;
      }
    }
  }
  playQueue(newPosition);
}

function shuffleAllQueue() {

  shuffle_array = [];
  shuffle_position = 0;
  var qLength = parseInt(localStorage.getItem('length'));
  for(var i=0; i<qLength; i++) {
    var newPosition = Math.floor((Math.random() * qLength));
    while(shuffle_array.indexOf(newPosition) >= 0) {
      newPosition = Math.floor((Math.random() * qLength));
    }
    shuffle_array.push(newPosition);
  }

}
/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function toggleShuffle() {
  if(shuffle == true) {
    $('#shuffleButton').css('background-color','#FFFFFF');
    shuffle = false;
  }
  else {

    shuffle_array = [];
    shuffleAllQueue();
    $('#shuffleButton').css('background-color','#71B500');
    if (localStorage.getItem("currPosition") != null) {
      shuffle_array = [parseInt(localStorage.getItem('currPosition'))]
    }
    shuffle = true;
  }

}


/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function loopQueue() {
  if(loop == true) {
    $('#loopButton').css('background-color','#FFFFFF');
    loop = false;
  }
  else {
    $('#loopButton').css('background-color','#71B500');
    loop = true;
  }
  console.log(loop);
}

/*  =============================================================================
    Called when user clicks song on queue list

    @param      
    @return     none
    ========================================================================== */
function queueClick(idAndPosition) {
  // Unhighlights previous played song if there was one
  if (localStorage.getItem('currPosition') != null) {   
    $('#li' + parseInt(localStorage.getItem('currPosition'))).css('background-color','#FFFFFF');
    $('#li' + parseInt(localStorage.getItem('currPosition')) + ' button').css('background-color','#FFFFFF');
  }
  //Get title is actually getting the position and not title
  var position = getTitle(idAndPosition);
  console.log(position); 
  playQueue(position);
}


/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function displayVideoOrTrack(idAndTitle) {
  // Hide splash screen query
  hideSplashQuery();

  var id = getID(idAndTitle);
  var title = getTitle(idAndTitle);
  // Sets the currently playing
  setCurrentlyPlaying(id);

  // Display youtube video
  console.log("ID:" + id);
  if (id.indexOf('soundcloud') == -1) {
    hideSCPlayer();
    stopSCPlayer();
    displayYoutube();
  }
  // Display soundcloud track
  else if (id.indexOf('soundcloud') > -1) {
    hideYTPlayer();
    stopVideo();
    displaySoundCloud();
    playSC();
  }
  else {
    // ERROR, never should get here
  }

}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function displayYoutube () {
  showYTPlayer();
  if(player != null) {
    loadYTVideo();
  }
  else {
    displayYouTubePlayer();
  }
  
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function displaySoundCloud () {
  showSCPlayer();
  if($('#sc-widget').length) {
    loadSCVideo();
  }
  else {
    displaySoundCloudPlayer();
  }
  
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function setCurrentlyPlaying(id) {
  localStorage.setItem('currPlaying', id);
}

function setCurrentPosition(position) {
  console.log("Position: " + position);
  localStorage.setItem('currPosition', position); 
}

