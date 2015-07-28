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
  var overlay = "<div class='overlay'>";
  var button = "<button id='close-button' onclick='finishedOverlaying()'> x </button>";
  var youTubeTracks = "<div id='youTubeTracks'></div>";
  var soundCloudTracks = "<div id='soundCloudTracks'>  </div> </div>"; 
  $(divToOverlay).append(overlay + button + youTubeTracks + soundCloudTracks);
}

/*  =============================================================================
    Called in: search.js
    Inserts the new query box after overlaying

    @param      none
    @return     none
    ========================================================================== */
function insertTopSearchBar() {
  hideSplashQuery();
  var top_title = "<div id='top-title'> Vent DJ </div>";
  var top_search_form = "<div id='top-search-form'> <form onsubmit='javascript:search();'> <input id='top-search-box' type='search'> </form>";
  var top_search_button = "<button  onclick='search();'id='top-search-button'><i class='fa fa-search'></i></button></div>";
  $("#top-nav").append(top_title + top_search_form + top_search_button);

}

/*  =============================================================================
    Called in: overlay.js
    Inserts the new query into splash screen if no playlist

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
  $("#top-title").remove();
  $("#top-search-form").remove();
}

/*  =============================================================================
    Called in: search.js
    Removes the overlay once done

    @param      div     The div to remove the overlay
    @return     none
    ========================================================================== */
// For later use for modular function
// function finishedOverlaying(divToOverlay) {
//   console.log("hello");
//   $(divToOverlay + " > div[class='overlay']").remove();
//   console.log("FINISHED REMOVING OVERLAY\n\n");
// }



function finishedOverlaying() {
  $("#splash-screen > div[class='overlay']").remove();

  // If the queue list is empty
  if (!$.trim($('#queues').text()).length) {
    insertSplashSearchBar();
  }
  else {
    playQueue();
  }
  
  // displayYouTubePlayer();
  checkSize();

  console.log("FINISHED REMOVING OVERLAY\n\n");

}