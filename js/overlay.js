/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */


function overlayTracks(divToOverlay) {
  console.log("Overlaying tracks");
  $(divToOverlay).append("<div class='overlay'> <button id='close' onclick='finishedOverlaying()'> x </button>");
  $(divToOverlay).append("</div>");

  
}

function displayTracksOnOverlay(tracks) {

}

function test() {
  console.log("test");
}
/*  =============================================================================
    Called in: displayTracks.js and displayPlaylist.js
    Ends the loading screen for the given div given by the arguments
    @param      div     The div to remove the overlayn
    
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
  $("#query-form").hide();
  $("#title").hide();
  var top_title = "<div id='top-title'> Vent DJ </div>";
  var top_search_form = "<div id='top-search-form'> <form> <input id='top-search-box' type='search'> </form>";
  var top_search_button = "<button id='top-search-button'><i class='fa fa-search'></i></button></div>";
  $("#top-nav").append(top_title + top_search_form + top_search_button);
  displaySoundCloudPlayer();
  // displayYouTubePlayer();
  checkSize();

  console.log("FINISHED REMOVING OVERLAY\n\n");

}