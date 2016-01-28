/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var loop = false; //Check to see if loop is true or false
var shuffle = false; //Check if shuffle true or false
var shuffle_position;
var shuffle_array; //Array of numbers to shuffle through

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
function playShuffleOnClick() {
  // If the shuffle is off, starts the queue at top of queue
  if (shuffle == false) {
    playQueue(0);
  }
  // If the shuffle is on, starts the queue at a random song
  else {
    shuffleQueue();
  }
}

/*  =============================================================================
    When button is pressed to play queue

    @param      int   position of next Song
    @return     none
    ========================================================================== */
function playQueue(position) {
  //If empty queue, just return
  if (localStorage.getItem("length") === null) {
    return;
  }

  //If top title doesn't exist insert it
  if(!$('#top-search-form').length) {
    insertTopSearchBar();
    $("#ppQueue").empty();
    $("#ppQueue").append("<button onclick='pauseQueue(0)'><i class='fa fa-pause'></i></button>");
  }

  //Gets top of list on queue
  var found = false;
  var i = position;

  // Continues to find the next song that is available closest to the position
  while (!found) {
    //At the end of length
    if(i == parseInt(localStorage.getItem('length')) && loop == false) {
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
    else if (i == parseInt(localStorage.getItem('length')) && loop == true) {
      playQueue(0);
      return;
    }

    if (localStorage.getItem(i.toString()) != null) {
      found = true;  
      // Highlights the song on the queue bar
      $('#li' + i).css('background-color','#71B500');
      $('#li' + i + ' button').css('background-color','#71B500');
      // Set the position to the song currently playing position
      setCurrentPosition(i.toString());
      // Go to displaying song if youtube or soundcloud
      displayVideoOrTrack(localStorage.getItem(i.toString()));      
    }
    ++i;
  }
}

/*  =============================================================================
    When previous button is pressed, does the other side of the playQueue function

    @param      int   position of next Song
    @return     none
    ========================================================================== */
function prevPlayQueue(position) {
  //If empty queue, just return
  if (localStorage.getItem("length") === null) {
    return;
  }

  //If top title doesn't exist insert it
  if(!$('#top-search-form').length) {
    insertTopSearchBar();
    $("#ppQueue").empty();
    $("#ppQueue").append("<button onclick='pauseQueue(0)'><i class='fa fa-pause'></i></button>");
  }

  //Gets top of list on queue
  var found = false;
  var i = position;

  // Continues to find the next song that is available closest to the position
  while (!found) {
    //At the end of length
    if(i < 0 && loop == false) {
      closeAllVideo();
      $("#ppQueue").empty();
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
      return;
    }
    else if (i < 0 && loop == true) {
      prevPlayQueue(parseInt(localStorage.getItem("length")));
      return;
    }

    if (localStorage.getItem(i.toString()) != null) {
      found = true;  
      // Go to displaying song if youtube or soundcloud
      // Highlights top list on queue or etc.
      $('#li' + i).css('background-color','#71B500');
      $('#li' + i + ' button').css('background-color','#71B500');
      setCurrentPosition(i.toString());
      displayVideoOrTrack(localStorage.getItem(i.toString()));      
    }
    --i;
  }
}

/*  =============================================================================
    When the next button is pressed, calls playQueue of the current position

    @param      none
    @return     none
    ========================================================================== */
function nextQueue() {
  // Goes to shuffle queue
  if (localStorage.getItem("currPlaying") == null && shuffle == true) {
    shuffleQueue();
    return;
  }
  // Does a regular play queue
  else if (localStorage.getItem("currPlaying") == null && shuffle == false) {
    playQueue(0);
    return; 
  }
  
  // Unhighlights the previous track to emphasize change of current song
  // Removes the background-color property completely, need to do this in order for the #liNum to not overwrite the #queue li classes
  $('#li' + parseInt(localStorage.getItem('currPosition'))).css('background-color','');
  $('#li' + parseInt(localStorage.getItem('currPosition')) + ' button').css('background-color','');
  
  if(shuffle == true) {
    shuffleQueue();
    return;
  }

  //Get next on list of queue
  var currPos = parseInt(localStorage.getItem('currPosition')) + 1;
  //check if loop is true then loop if not check if false then stop videos and return
  if((parseInt(localStorage.getItem('length')) <= currPos) && loop == true) {
    currPos = 0;
  }
  // If at the end and not in loop
  else if((parseInt(localStorage.getItem('length')) <= currPos) && loop == false) {
    closeAllVideo();
    $("#ppQueue").empty();
    $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
    return;
  }
  playQueue(currPos);
}

/*  =============================================================================
    When the previous button is clicked

    @param      nonw
    @return     none
    ========================================================================== */
function prevQueue() {
  if (localStorage.getItem("currPlaying") == null && shuffle == true) {
    shuffle_position = shuffle_array.length - 1;
    prevShuffleQueue();
    return;
  }
  else if (localStorage.getItem("currPlaying") == null && shuffle == false) {
    playQueue(0);
    return; 
  }
  
  // Unhighlights the previous track to emphasize change of current song
  // Removes the background-color property completely, need to do this in order for the #liNum to not overwrite the #queue li classes
  $('#li' + parseInt(localStorage.getItem('currPosition'))).css('background-color','');
  $('#li' + parseInt(localStorage.getItem('currPosition')) + ' button').css('background-color','');
  
  if(shuffle == true) {
    prevShuffleQueue();
    return;    
  }

  //Get prev on list of queue
  var currPos = parseInt(localStorage.getItem('currPosition')) - 1;
  //check if loop is true then loop if not check if false then stop videos and return
  if((currPos < 0) && loop == true) {
    currPos = parseInt(localStorage.getItem('length'));
  }
  else if(currPos < 0 && loop == false) {
    closeAllVideo();
    $("#ppQueue").empty();
    $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>");
    return;
  }
  prevPlayQueue(currPos);
}

/*  =============================================================================
    When the queue is paused

    @param      nonw
    @return     none
    ========================================================================== */
function pauseQueue() {
  pauseSCPlayer();
  pauseVideo();
  $("#ppQueue").empty();
  $("#ppQueue").append("<button onclick='resumeQueue()'><i class='fa fa-play'></i></button>");
}

/*  =============================================================================
    When the queue is resumed

    @param      nonw
    @return     none
    ========================================================================== */
function resumeQueue() {
  playVideo();
  playSCPlayer();
  $("#ppQueue").empty();
  $("#ppQueue").append("<button onclick='pauseQueue()'><i class='fa fa-pause'></i></button>");
}


/*  =============================================================================
    When the loop button is pressed, alternates the current state of the loop

    @param      none
    @return     none
    ========================================================================== */
function loopQueue() {
  // If the loop is on, turn loop off
  if(loop == true) {
    $('#loopButton').css('background-color','#FFFFFF');
    loop = false;
  }
  // If the loop is off, turn loop on
  else {
    $('#loopButton').css('background-color','#71B500');
    loop = true;
  }
}

/*  =============================================================================
    Called when user clicks song on queue list

    @param      The id and position to parse
    @return     none
    ========================================================================== */
function queueClick(idAndPosition) {
  // Unhighlights previous played song if there was one
  if (localStorage.getItem('currPosition') != null) {   
    // Removes the background-color property completely, need to do this in order for the #liNum to not overwrite the #queue li classes
    $('#li' + parseInt(localStorage.getItem('currPosition'))).css('background-color','');
    $('#li' + parseInt(localStorage.getItem('currPosition')) + ' button').css('background-color','');
  }
  // Get title is actually getting the position and not title
  // The queue buttons' ID is the position of the song within context of the localStorage
  var position = getTitle(idAndPosition);
  resumeQueue();
  playQueue(position);
}


/*  =============================================================================
    Displays the youtube video or soundcloud track

    @param      The id and title to parse
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
  if (id.indexOf('soundcloud') == -1) {
    hideSCPlayer();
    displayYoutube();
  }
  // Display soundcloud track
  else if (id.indexOf('soundcloud') > -1) {
    hideSCPlayer();
    hideYTPlayer();
    stopVideo();
    displaySoundCloud();
    // playSCAfterLoading();
  }
  else {
    // ERROR, never should get here
  }
}

/*  =============================================================================
    Closes the players and clears the localStorages for which is currently playing
    and the position

    @param      none
    @return     none
    ========================================================================== */
function closeAllVideo() {
  hideSCPlayer();
  hideYTPlayer();
  stopVideo();
  insertSplashSearchBar();
  localStorage.removeItem('currPlaying');
  localStorage.removeItem('currPosition');
}

/*  =============================================================================
    Sets the local Storage key currPlaying to the id given

    @param      Which song to be currently playing
    @return     none
    ========================================================================== */
function setCurrentlyPlaying(id) {
  localStorage.setItem('currPlaying', id);
}

/*  =============================================================================
    Sets the local storage key currPosition to the position given

    @param      Song position
    @return     none
    ========================================================================== */
function setCurrentPosition(position) {
  localStorage.setItem('currPosition', position); 
}

