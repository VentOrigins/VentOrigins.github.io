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
    $("#ppQueue").append("<button onclick='pauseQueue(0)'><i class='fa fa-pause'></i></button>'");
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
      $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>'");
      return;
    }
    if (localStorage.getItem(i.toString()) != null) {
      console.log("IF2");
      found = true;  

      // Go to displaying song if youtube or soundcloud
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
  $("#ppQueue").append("<button onclick='resumeQueue(0)'><i class='fa fa-play'></i></button>'");
}

function resumeQueue() {
  playVideo();
  playSCPlayer();
}
/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function nextQueue() {
  if (localStorage.getItem("currPlaying") === null) {
     playQueue(0);
     return;
  }
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
    $("#ppQueue").append("<button onclick='playQueue(0)'><i class='fa fa-play'></i></button>'");
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
  if( (shuffle_array.length - 1) == shuffle_position - 1) {
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
  //Get new position
  var newPosition = shuffle_array[shuffle_position];
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

