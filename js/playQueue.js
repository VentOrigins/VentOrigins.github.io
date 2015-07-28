/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

// When button is pressed to play queue
/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function playQueue() {
  // If emptpy queue, just return
  if (localStorage.getItem("length") === null) {
    return;
  }

  //Gets top of list on queue
  var found = false;
  var i = 0;

  while (!found) {
    if (localStorage.getItem(i.toString() != 'undefined')) {
      found = true;  

      // Go to displaying song if youtube or soundcloud
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
function nextOnQueue() {
  //Get next on list of queue

  // Deletes top track on queue

  // Go to displaying song if youtube or soundcloud
  displayVideoOrTrack()
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
  if (id.indexOf('soundcloud') == -1) {
    displayYoutube();
  }
  // Display soundcloud track
  else if (id.indexOf('soundcloud') > -1) {
    displaySoundCloud();
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
  displayYouTubePlayer()
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function displaySoundCloud () {
  // displaySoundCloudPlayer();
}

/*  =============================================================================
    

    @param      
    @return     none
    ========================================================================== */
function setCurrentlyPlaying(id) {
  localStorage.setItem('currPlaying', id);
}



