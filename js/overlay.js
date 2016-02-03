/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Called in: search.js
    Overlays the tracks with a div

    @param      div     The div to remove the overlay
    @return     none
    ========================================================================== */
function overlayTracks(divToOverlay) {  
  
  //Check if overlay is made already and empty tracks
  if($('#youTubeAndSoundCloudTracks').length) {
    $('#youTubeAndSoundCloudTracks').empty();
    return;
  }
  // Actually creates the overlay if it does not exist yet
  var overlay = "<div class='overlay'>";
  var button = "<button id='close-button' onclick='finishedOverlaying()'> x </button>";
  var youTubeAndSoundCloudTracks = "<div id='youTubeAndSoundCloudTracks'></div>";
  $(divToOverlay).append(overlay + button + youTubeAndSoundCloudTracks);
}

/*  =============================================================================
    Called in: search.js
    Inserts the new query box after overlaying

    @param      none
    @return     none
    ========================================================================== */
function insertTopSearchBar() {
  hideSplashQuery();
  // This is the title Vent DJ, removed for now because of different screen sizes
  // var top_title = "<div class=left id='top-title'> Vent DJ </div>";
  var top_search_form = "<div id='top-search-form'> <form onsubmit='javascript:search();'> <input id='top-search-box' type='search'> </form>";
  var top_search_button = "<button  onclick='search();'id='top-search-button'><i class='fa fa-search'></i></button></div>";
  
  $("#top-nav").append(top_search_form + top_search_button);
}

/*  =============================================================================
    Called in: overlay.js
    These functions deal with the splash screen and top nav bar coming in and
    out of the screen.

    @param      none
    @return     none
    ========================================================================== */
function insertSplashSearchBar() {
  removeNavBarQuery();
  $("#query-form").show();
  $("#title").show();
}

function hideSplashQuery() {
  $("#query-form").hide();
  $("#title").hide();
}

function removeNavBarQuery() {
  // This is the title Vent DJ, removed for now because of different screen sizes
  // $("#top-title").remove();
  $("#top-search-form").remove();
}

/*  =============================================================================
    Called in: search.js
    Removes the overlay once done

    @param      none
    @return     none
    ========================================================================== */
function finishedOverlaying() {
  $("#splash-screen > div[class='overlay']").remove();

  // If the queue list is empty, adds the splash screen
  if(localStorage.getItem("currPlaying") === null) {
    insertSplashSearchBar();
  }
  
  checkSize();
}