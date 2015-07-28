/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

// When button is pressed to play queue
/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function playQueue(position) {
  // If emptpy queue, just return
  if (localStorage.getItem("length") === null) {
    return;
  }

  //Gets top of list on queue
  var found = false;
  console.log(position + " Playqueue");
  var i = position;

  while (!found) {

    //At the end of length
    if(i == parseInt(localStorage.getItem('length')))
      return;

    if (localStorage.getItem(i.toString()) != 'undefined') {
      found = true;  

      // Go to displaying song if youtube or soundcloud
      setCurrentPosition(i.toString());
      displayVideoOrTrack(localStorage.getItem(i.toString()));


      // Highlights top list on queue or etc.
      
    }

    ++i;
  }
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function nextQueue() {
  //Get next on list of queue
  var currPos = parseInt(localStorage.getItem('currPosition')) + 1;
  if(parseInt(localStorage.getItem('length')) == currPos) {
    currPos = 0;
  }
  playQueue(currPos);

}

// DO NOT KNOW IF WE NEED TO USE THIS FUNCTIONALITY YET
/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function prevOnQueue() {

  // Go to displaying song if youtube or soundcloud
  displayVideoOrTrack()
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
    displayYoutube();
  }
  // Display soundcloud track
  else if (id.indexOf('soundcloud') > -1) {
    hideYTPlayer();
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

